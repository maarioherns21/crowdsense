import { Request, Response } from "express";
import { Bar, ReviewBar } from "../model/bar"

// GET /bars
export const getAllBars = async (req: Request, res: Response): Promise<void> => {
  try {
    const bars = await Bar.find().populate('reviews');

    res.status(200).json(bars);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /bars/:id
export const getBarById = async (req: Request, res: Response): Promise<void> => {
  try {
    const bar = await Bar.findById(req.params.id).populate('reviews');

    if (!bar) {
      res.status(404).json({ message: "Bar not found" });
      return;
    }

    res.status(200).json(bar);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /bars
export const createBar = async (req: Request, res: Response): Promise<void> => {
  const { name, address, location, capacity, noise, crowd, specials, photos } = req.body;

  try {
    const bar = new Bar({
      name,
      address,
      location,
      capacity,
      noise,
      crowd,
      specials,
      photos,
    });

    const newBar = await bar.save();

    res.status(201).json(newBar);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH /bars/:id
export const updateBar = async (req: Request, res: Response): Promise<void> => {
  const { name, address, location, capacity, noise, crowd, specials, photos } = req.body;

  try {
    const bar = await Bar.findById(req.params.id);

    if (!bar) {
      res.status(404).json({ message: "Bar not found" });
      return;
    }

    if (name) bar.name = name;
    if (address) bar.address = address;
    if (location) bar.location = location;
    if (capacity) bar.capacity = capacity;
    if (noise) bar.noise = noise;
    if (crowd) bar.crowd = crowd;
    if (specials) bar.specials = specials;
    if (photos) bar.photos = photos;

    const updatedBar = await bar.save();

    res.status(200).json(updatedBar);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /bars/:id
export const deleteBar = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedBar = await Bar.findByIdAndDelete(req.params.id);

    if (!deletedBar) {
      res.status(404).json({ message: "Bar not found" });
      return;
    }

    await ReviewBar.deleteMany({ bar: deletedBar._id });

    res.status(200).json({ message: "Bar deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};