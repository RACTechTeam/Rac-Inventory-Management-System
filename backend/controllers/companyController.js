const catchAsyncErrors = require("../middleWare/catchAsyncErrors");
const Company = require("../modals/companyModal");
const ErrorHandler = require("../utils/errorhander");

//CREATE COMPNAY
exports.createCompany = catchAsyncErrors(async(req,res,next)=>{
    const company =await Company.create(req.body);

    res.status(200).json({
        success:true,
        company,
    })
});


//GET A COMPANY
exports.getCompanyDetails = catchAsyncErrors(async(req,res,next)=>{

    const company = await Company.findOne({refNumber:req.params.refNumber});

    if(!company){
        return next(new ErrorHandler("Company for product not found", 404));
    }

    res.status(200).json({
        success:true,
        company,
    })
})


//GET ALL COMPANIES
exports.getAllCompanies = catchAsyncErrors(async(req, res, next)=>{
    const allCompanyDetails = await Company.find();

    if(!allCompanyDetails){
        return next(new ErrorHandler("Error Fetching Companies", 404));
    }

    res.status(200).json({
        success:true,
        allCompanyDetails,
    })
});

//Delete company

exports.deleteCompany = catchAsyncErrors(async(req, res, next)=>{
    const company = await Company.findOne({refNumber:req.params.refNumber});

    if(!company){
        return next(new ErrorHandler("Product not found", 404));
    }

    await company.deleteOne();

    res.status(200).json({
        success:true,
        message:"Company Deleted Successfully",
    })
})