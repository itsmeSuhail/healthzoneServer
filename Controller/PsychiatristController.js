import { uniqeId } from "../utility/uniqeId.js"
import { validEmail, validName, validatePhoneNumberWithCountryCode, validatePsychiatristData } from "../utility/validator.js";
import { responseError, responseSuccess } from "../utility/responseHandler.js";
export const addPsychiatrist=async (req, res) => {
    const error = validatePsychiatristData(req.body);
    if (error == null) {
         try {
             const id = uniqeId.generateRandomString();
             const { hospitalId, name, email, phone, password } = req.body;
 
             const [rows] = await req.db.execute('SELECT id FROM hospital WHERE id = ?', [hospitalId]);
             if (rows.length == 0) {
       responseError(res, 400, "bad credentials", { error: "hospitalId is not valid" });
             }
             else {
 
                 await req.db.execute('INSERT INTO psychiatrist (id,hospital_id,name, email,phone,password,patient_count) VALUES (?, ?,?,?,?,?,?)', [id, hospitalId, name, email, phone, password, 0]);
                 responseSuccess(res, 201, "psychiatrist account has been created", { psychiatristId: id });
 
             }
         } catch (err) {
             responseError(res, 500, "Internal server error", err);
         }
     }
     else {
     responseError(res, 400, "All Attributes required", error);
     }
 }
 export const psychiatristDetailsById=async (req, res) => {
    const Id = req.params.id;
    try {
      if(Id===undefined||Id===''){
        responseError(res,400,"bad credentials",{error:"Invalid  id"});
      }
      const [rows] = await req.db.execute(`
      SELECT
      psy.id AS psychiatrist_id,
      psy.name AS psychiatrist_name,
      psy.patient_count,
      pat.name AS patient_name,
      pat.id AS patient_id
    FROM
      psychiatrist psy
    LEFT JOIN
      patient pat ON psy.id = pat.psychiatrist_id
    WHERE
      psy.id = ?;
  
    `, [Id]);
  
      if (rows.length === 0) {
        responseError(res, 404, "no data", { error: "Invalid id or data not available" });

        return;
      }
  
      const psychiatristData = {
        psychiatrist_name: null,
        patient_count: null,
        patientArr: []
      };
  
      if (rows.length > 0) {
        psychiatristData.psychiatrist_name = rows[0].psychiatrist_name;
        psychiatristData.patient_count = rows[0].patient_count;
  
        rows.forEach(row => {
          psychiatristData.patientArr.push({
            name: row.patient_name,
            id: row.patient_id
          });
        });
      }
  
      responseSuccess(res, 200, "data found", psychiatristData);
  
      
    } catch (error) {
        responseError(res, 500, "Internal server error", error);

    }
  
  }
 export const getAllPsychiatrist= async (req, res) => {
    try {
        const [rows] = await req.db.execute("SELECT* FROM psychiatrist");
        if (rows.length === 0) {
        responseError(res, 404, "no data", { error: "Data not Found" });

        }
        responseSuccess(res, 200, "data found", rows);
    } catch (error) {
        responseError(res, 500, "Internal server error", error);
    }
}
export const getPsychiatris= async (req, res) => {
    try {
        const id = req.params.id
        if(id===undefined||id===''){
            responseError(res,400,"bad credentials",{error:"Invalid  id"});
          }
        const [rows] = await req.db.execute('SELECT* from psychiatrist where id=?', [id]);
        if (rows.length == 0) {
            responseError(res, 404, "no data", { error: "Invalid id or data not available" });

        } else {
            responseSuccess(res, 200, "data found", rows);
        }
    } catch (error) {
        responseError(res, 500, "Internal server error", error);
    }
}
export const deletePsychiatrist= async (req, res) => {
    try {
        const id = req.params.id;
        if(id===undefined||id===''){
            responseError(res,400,"bad credentials",{error:"Invalid  id"});
          }
        const [rows] = await req.db.execute('DELETE FROM psychiatrist WHERE id = ?', [id]);

        if (rows.affectedRows > 0) {
            responseSuccess(res, 200, "data has been deleted succfully");

        } else {
            responseError(res, 404, "no data", { error: "Unable to delete. Id is not valid" });

        }
    } catch (error) {
        responseError(res, 500, "Internal server error", error);

    }
}
export const updatePschiatrist=async (req, res) => {
    try {
        let id = req.params.id;
        if(id===undefined||id===''){
            responseError(res,400,"bad credentials",{error:"Invalid  id"});
          }
        const updateFields = [];
        const values = [];
        const errorBucket = {};
        if (req.body.name) {
            const checkerror = validName(req.body.name);
            if (checkerror) {
                errorBucket["name"] = checkerror;
            }
           else{
               updateFields.push('name = ?');
               values.push(req.body.name);
           }
        }
        if (req.body.patient_count) {
            
               updateFields.push('patient_count = ?');
               values.push(parseInt(req.body.patient_count));
        }
        if (req.body.email) {
            const checkerror = validEmail(req.body.email);
            if (checkerror) {
                errorBucket["email"] = checkerror;
            }
else{

    updateFields.push('email = ?');
    values.push(req.body.email);
}   
        }
        if (req.body.phone) {
            const checkerror = validatePhoneNumberWithCountryCode(req.body.phone);
            if (checkerror) {
                errorBucket["phone"] = checkerror;
            }
            else{
                updateFields.push('phone = ?');
            values.push(req.body.phone);
            }
        }

        if(Object.keys(req.body).length===0){
            responseError(res, 400, " Attributes required", {error:"fields required for update",});
      
          }
    else    if (Object.keys(errorBucket).length > 0) {
            responseError(res,400,"bad credentials",{error:"Invalid  id"});

        } else {
            const sqlQuery = `
        UPDATE psychiatrist
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