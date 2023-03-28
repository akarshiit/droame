import Drone from "../models/Drone.js";

export const createDrone = async (req, res, next) => {
  const newDrone = new Drone(req.body);

  try {
    const saveDrone = await newDrone.save();
    res.status(200).json(saveDrone);
  } catch (err) {
    next(err);
  }
};
export const updateDrone = async (req, res, next) => {
  try {
    const updateDrone = await Drone.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateDrone);
  } catch (err) {
    next(err);
  }
};
export const deleteDrone = async (req, res, next) => {
  try {
    await Drone.findByIdAndDelete(req.params.id);
    res.status(200).json("Drone has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getDrone = async (req, res, next) => {
  try {
    const drone = await Drone.findById(req.params.id);
    res.status(200).json(drone);
  } catch (err) {
    next(err);
  }
};
export const getDrones = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Drone.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Drone.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Drone.countDocuments({ type: "drone" });
    const apartmentCount = await Drone.countDocuments({ type: "apartment" });
    const resortCount = await Drone.countDocuments({ type: "resort" });
    const villaCount = await Drone.countDocuments({ type: "villa" });
    const cabinCount = await Drone.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "drone", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};


