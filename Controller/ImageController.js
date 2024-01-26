import { responseError } from "../utility/responseHandler.js";

export const getImage=async (req, res) => {
    const imageId = req.params.id;
    if(imageId===undefined||imageId===''){
      responseError(res,400,"bad credentials",{error:"Invalid  id"});
    }
    const [rows] = await req.db.execute('SELECT image_data FROM images WHERE id = ?', [imageId]);
    if (rows.length > 0) {
      const imageData = rows[0].image_data;
      res.setHeader('Content-Type', 'image/jpeg'); 
      res.end(imageData, 'binary');
    } else {
      responseError(res, 404, "Invalid user Query", {error:"Image not found"});

    }
  }