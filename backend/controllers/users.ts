import { User, ReviewUser } from '../model/user';
import { Request, Response } from 'express';
import multer from "multer";



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
const isImage = (req: any , file: any, callback: any) => {
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

export const index = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await User.find(); // Retrieve an array of Bar objects using your Bar model
  
      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  
  export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (error: any ) {
      res.status(500).json({ message: error.message });
    }
  };


  export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const  user = req.body
      console.log(req.body)
      const { filename }: any = req.file   
       
      const newUser = new User({...user , image: filename})
       
      await newUser.save();
      console.log(newUser)

      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const user = await User.findByIdAndDelete(id);

      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
  
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {

    const user = req.body;
    const { id } = req.params;
    const updateUser = { ...user, _id: id }

    const newUser = await User.findByIdAndUpdate(id, updateUser, { new: true });


    res.status(200).json(newUser);

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
  
  export const getUserReviews = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    try {
      const reviews = await ReviewUser.find({ user: id });
      res.status(200).json(reviews);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };