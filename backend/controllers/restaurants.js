import { Restaurant, ReviewRestaurant } from "../model/restaurant";
// import { Request, Response } from "express";
import multer from "multer";


//------AWS -----
// const s3 = new S3({
//   region: "nothing" ,
//   credentials: {
//     accessKeyId:"nothing",
//     secretAccessKey: "nothing",
//   },
// });

// const uploadS3 = multerS3({
//   s3: s3,
//   bucket: "fulltank",
//   acl: "public-read",
//   contentType: multerS3.AUTO_CONTENT_TYPE,
//   key: function (req, file, callback) {
//     callback(null, `image-${Date.now()}-${file.originalname}`);
//   },
// });

// const isImage = (req, file, callback) => {
//   if (file.mimetype.startsWith("image")) {
//     callback(null, true);
//   } else {
//     callback(new Error("only images are allowed"));
//   }
// };

// export const upload = multer({
//   storage: uploadS3,
//   fileFilter: isImage,
// });

//------------------------ multer -----------------------------
// img storage path
const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}. ${file.originalname}`);
  },
});

// img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only images is allowd"));
  }
};

export const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});
//------------------------ multer -----------------------------


export const index = async (req, res) => {
  try {
    const data = await Restaurant.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate("reviews");
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const createRestaurant = async (req, res) => {
  const restaurant = req.body;
  
  const { files } = req;

  const imageArray = files.map((file) => file.path);
  try {
    const newRestaurant = new Restaurant({ ...restaurant, fileImage: imageArray });
   
    const data = await newRestaurant.save();

    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (deletedRestaurant) {
      res.status(200).json(deletedRestaurant);
    } else {
      res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (updatedRestaurant) {
      res.status(200).json(updatedRestaurant);
    } else {
      res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



///single upload 
// export const createRestaurant = async (req, res) => {
//   try {
//     const { name, address, cuisine, priceRange, rating, reviews, location  } = req.body;
//     const {filename} = req.file;
//     console.log(req.file)

//     const newMovie = new Restaurant({ name, address, cuisine, priceRange, rating, reviews, fileImage: filename, location  });
//      console.log(newMovie)
//     const saveMovie = await newMovie.save();

//     res.status(201).json({ status: 201, saveMovie });
//   } catch (error) {
//     console.log(error.message)

//     res.status(401).json({ error : error.message });
//   }
// };