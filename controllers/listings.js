const Listing = require("../models/listing");
const { getCoordinates } = require("../utils/geocode");

module.exports.index = async (req, res) => {
  let allListings;
  const filterMap = {
    trending: 'popular|top|trending',
    rooms: 'room|apartment|stay|bed',
    'iconic cities': 'city|urban|metropolitan|downtown',
    mountains: 'mountain|hike|peak|alpine',
    castles: 'castle|palace|fortress|historic',
    'amazing pools': 'pool|swimming|resort|infinity',
    camping: 'camp|tent|outdoor|wilderness',
    farms: 'farm|ranch|countryside|agri',
    arctic: 'snow|ice|arctic|glacier|northern',
    domes: 'dome|geodesic|eco|unique',
    boats: 'boat|ship|yacht|lake|ocean'
  };

  if (req.query.q) {
    if (!req.query.q.trim()) {
      return res.redirect('/listings');
    }
    const search = new RegExp(req.query.q.trim(), 'i');
    allListings = await Listing.find({
      $or: [{ title: search }, { location: search }]
    });
  } else if (req.query.filter && filterMap[req.query.filter]) {
    const regex = new RegExp(filterMap[req.query.filter], 'i');
    allListings = await Listing.find({
      $or: [{ title: regex }, { location: regex }]
    });
  } else {
    allListings = await Listing.find({});
  }

  res.render("listings/index.ejs", { allListings, query: req.query });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing Not Found");
    res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  console.log(url, "..", filename);
  if (!req.body.listing) {
    throw new ExpressError(400, "Send valid data for listing");
  }
  //  GET LOCATION
  let { location } = req.body.listing;
  //  GET COORDINATES
  let coords = await getCoordinates(location);
  console.log("COORDS", coords);
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  //  SAVE GEOMETRY
  newListing.geometry = coords;
  await newListing.save();
  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash("error","Listing you requested for does not exist!");
    res.redirect("/listings");
  }

  let originalImageUrl=listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
  res.render("listings/edit.ejs", { listing,originalImageUrl });
}
module.exports.UpdateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
