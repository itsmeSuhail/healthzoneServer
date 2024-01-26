import { validLocation, validName, validateHospitalData } from "..//utility/validator.js";
import { uniqeId } from "../utility/uniqeId.js"
import { responseError, responseSuccess } from "../utility/responseHandler.js";
export const addHospital = async (req, res) => {
  const error = validateHospitalData(req.body);
  if (error == null) {
    try {
      const id = uniqeId.generateRandomString();
      const { name, location } = req.body;
      await req.db.execute('INSERT INTO hospital (id, name,location) VALUES (?, ?,?)', [id, name, location]);
      responseSuccess(res, 201, "Hospital  has been added", { hospitalId: id })
    } catch (err) {
      responseError(res, 500, "Internal server error", { error: "Unable to add hospital" });
    }
  }
  else {
    responseError(res, 400, "All Attributes required", error)
  }
}
export const hospitalDetailsById = async (req, res) => {
  const hospitalId = req.params.id;
  try {
    if (hospitalId === undefined || hospitalId === '') {
      responseError(res, 400, "bad credentials", { error: "Invalid  id" });
    }
    const [result] = await req.db.execute(`
    SELECT
    h.name AS hospitalName,
    COUNT(DISTINCT ps.id) AS totalPsychiatrists,
    COUNT(DISTINCT patient.id) AS totalPatients,
    GROUP_CONCAT(DISTINCT CONCAT(ps.id, ',', ps.name, ',', IFNULL(pt.patientsCount, 0)) SEPARATOR ';') AS psychiatristDetails
  FROM hospital h
  LEFT JOIN psychiatrist ps ON h.id = ps.hospital_id
  LEFT JOIN (
    SELECT psychiatrist_id, COUNT(*) AS patientsCount
    FROM patient
    GROUP BY psychiatrist_id
  ) pt ON ps.id = pt.psychiatrist_id
  LEFT JOIN patient ON ps.id = patient.psychiatrist_id
  WHERE h.id = ?
  GROUP BY h.id;
  
    `, [hospitalId]);

    if (result.length === 0) {
      responseError(res, 404, "no data", { error: "Invalid id or data not available" });

      return;
    }

    const hospitalDetails = result[0];
    const { hospitalName, totalPsychiatrists, totalPatients, psychiatristDetails } = hospitalDetails;


    let psychiatristDetailsArray = [];
    if (psychiatristDetails) {
      psychiatristDetailsArray = psychiatristDetails.split(';').map(entry => {
        const [id, name, patientsCount] = entry.split(',');
        return { id, name, patientsCount: parseInt(patientsCount) };
      });
    }
    responseSuccess(res, 200, "data found", {
      hospitalName, totalPsychiatrists, totalPatients, psychiatristDetailsArray
    });

  } catch (error) {
    responseError(res, 500, "Internal server error", error);

  }

}
export const getAllHospitals = async (req, res) => {
  try {
    const [rows] = await req.db.execute("SELECT* FROM hospital");
    if (rows.length === 0) {
      responseError(res, 404, "no data", { error: "Data not found" });
    }
    responseSuccess(res, 200, "data found", rows);
  } catch (error) {
    responseError(res, 500, "Internal server error", error);
  }
}
export const getHospital = async (req, res) => {
  try {
    const id = req.params.id
    if (id === undefined || id === '') {
      responseError(res, 400, "bad credentials", { error: "Invalid  id" });
    }
    const [rows] = await req.db.execute('SELECT* from hospital where id=?', [id]);
    if (rows.length == 0) {
      responseError(res, 404, "no data", { error: "Invalid id or data not available" });

    } else {
      responseSuccess(res, 200, "data found", rows);
    }
  } catch (error) {
    responseError(res, 500, "Internal server error", error);
  }
}
export const deleteHospital = async (req, res) => {
  try {
    const id = req.params.id;
    if (id === undefined || id === '') {
      responseError(res, 400, "bad credentials", { error: "Invalid  id" });
    }
    const [rows] = await req.db.execute('DELETE FROM hospital WHERE id = ?', [id]);

    if (rows.affectedRows > 0) {
      responseSuccess(res, 200, "data has been deleted succfully");

    } else {
      responseError(res, 404, "no data", { error: "Unable to delete.Id is not valid" });
    }
  } catch (error) {
    responseError(res, 500, "Internal server error", error);

  }
}
export const updateHospital = async (req, res) => {
  try {
    let id = req.params.id;
    if (id === undefined || id === '') {
      responseError(res, 400, "bad credentials", { error: "Invalid  id" });
    }
    const [row] = await req.db.execute('SELECT id FROM hospital WHERE id = ?', [id]);
      if(row.length===0){
        responseError(res,404,"not found",{error:"Invalid  id"});
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

    if (req.body.location!==undefined) {
      updateFields.push('location = ?');
      const checkerror = validLocation(req.body.location);
      if (checkerror) {
        errorBucket["location"] = checkerror;
      }
      values.push(req.body.location);
    }
    if (Object.keys(req.body).length === 0) {
      responseError(res, 400, " Attributes required", { error: "fields required for update", });

    }
    else if (Object.keys(errorBucket).length > 0) {
      responseError(res, 400, " Attributes required", errorBucket);
    }
    else if(updateFields.length===0){
      responseError(res,400,"bad credentials",{error:"please update selected fields only"});
    }
    else {
      const sqlQuery = `
        UPDATE hospital
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