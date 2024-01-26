import { generateFilename } from "../utility/imageId.js";
import { validAddress, validEmail, validName,  validatePatientData, validatePhoneNumberWithCountryCode,  } from "../utility/validator.js";
import { uniqeId } from "../utility/uniqeId.js"
import { responseError, responseSuccess } from "../utility/responseHandler.js";
export const addPatient=async (req, res) => {
  
    const error = validatePatientData({ ...req.body, image: req.file  });
    if (error) {
      responseError(res, 400, "All Attributes required", error);
    }
    else{
      const originalname = req.file.originalname;
      const timestamp = Date.now();
      const fileName = generateFilename(originalname, timestamp);
  
    try {
      const id = uniqeId.generateRandomString();
      const {psychiatristId, name, address, email, phone, password}=req.body;
      const [rows] = await req.db.execute('SELECT hospital_id FROM psychiatrist WHERE id = ?', [psychiatristId]);
  
      if (rows.length === 0) {
        responseError(res, 400, "bad credentials", { error: "psychiatristId is not valid" });
      }
      else{
  
          await req.db.execute('INSERT INTO patient (id, hospital_id, psychiatrist_id, name, address, email, phone, password, patient_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, rows[0]["hospital_id"], psychiatristId, name, address, email, phone, password, fileName]);
          
          await req.db.execute('INSERT INTO images (id, image_data) VALUES (?, ?)', [fileName, req.file.buffer]);
          
          await req.db.execute('UPDATE psychiatrist SET patient_count = patient_count + 1 WHERE id = ?', [psychiatristId]);
          responseSuccess(res,201,"Patient account has been created",{patientId: id })
      }
    } catch (err) {
      responseError(res, 500, "Internal server error", err);
    }
  }
  
  }
export const getAllPatients=async (req, res) => {
    try {
      const [rows] = await req.db.execute('SELECT* from patient');
      if (rows.length === 0) {
          responseError(res, 404, "no data", { error: "Data not Found" });
      }
      responseSuccess(res, 200, "data found", rows);
  } catch (error) {
      responseError(res, 500, "Internal server error", error);
  }
  }
export const getPatient= async (req, res) => {
    try {
      const id = req.params.id
      if(id===undefined||id===''){
        responseError(res,400,"bad credentials",{error:"Invalid  id"});
      }
      const [rows] = await req.db.execute('SELECT* from patient where id=?', [id]);
      if (rows.length == 0) {
        responseError(res, 404, "no data", { error: "Invalid id or data not available" });
  
      } else {
          responseSuccess(res, 200, "data found", rows);
      }
  } catch (error) {
      responseError(res, 500, "Internal server error", error);
  }
  }
export const deletePatient=async (req, res) => {
    try {
      const id = req.params.id;
      if(id===undefined||id===''){
        responseError(res,400,"bad credentials",{error:"Invalid  id"});
      }
      const [rows] = await req.db.execute('DELETE FROM patient WHERE id = ?', [id]);
  
      if (rows.affectedRows > 0) {
          responseSuccess(res, 200, "data has been deleted succfully");
  
      } else {
        responseError(res, 404, "no data", { error: "Unable to delete.Id is not valid" });
  
      }
  } catch (error) {
      responseError(res, 500, "Internal server error", error);
  
  }
  }
export const updatePatient=async (req, res) => {
    try {
      let id = req.params.id;
      if(id===undefined||id===''){
        responseError(res,400,"bad credentials",{error:"Invalid  id"});
      }
     
     
      const updateFields = [];
      const values = [];
      const errorBucket = {};
      if (req.body.name!==undefined) {
        updateFields.push('name = ?');
        const checkerror = validName(req.body.name);
        if (checkerror) {
          errorBucket["name"] = checkerror;
        }
        values.push(req.body.name);
      }
  
      if (req.body.address!==undefined) {
        updateFields.push('address = ?');
        const checkerror = validAddress(req.body.address);
        if (checkerror) {
          errorBucket["address"] = checkerror;
        }
        values.push(req.body.address);
      }
      if (req.body.email!==undefined) {
        updateFields.push('email = ?');
        const checkerror = validEmail(req.body.email);
        if (checkerror) {
          errorBucket["email"] = checkerror;
        }
        values.push(req.body.email);
      }
      if (req.body.phone!==undefined) {
        updateFields.push('phone = ?');
        const checkerror = validatePhoneNumberWithCountryCode(req.body.phone);
        if (checkerror) {
          errorBucket["phone"] = checkerror;
        }
        values.push(req.body.phone);
      }
      const [row] = await req.db.execute('SELECT id FROM patient WHERE id = ?', [id]);
      if(row.length===0){
        responseError(res,404,"not found",{error:"Invalid  id"});
      }
     else if(Object.keys(req.body).length===0){
        responseError(res, 400, " Attributes required", {error:"fields required for update",});
  
      }
    else  if (Object.keys(errorBucket).length > 0) {
        responseError(res,400,"bad credentials",errorBucket);
      }
      else if(updateFields.length===0){
        responseError(res,400,"bad credentials",{error:"please update selected fields only"});
      }
      else {
        const sqlQuery = `
        UPDATE patient
        SET ${updateFields.join(', ')}
        WHERE id=${id}
      `;
        await req.db.execute(sqlQuery, values);
        responseSuccess(res, 200, "data has been updated");
      }
    } catch (error) {
      responseError(res, 500, "Internal server error", error);
    }
  }