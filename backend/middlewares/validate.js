import { body, validationResult } from "express-validator";

// Validation rules with flat fields:
export const applicationValidationRules = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number"),

  body("dob")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Invalid date"),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid gender"),

  body("street").trim().notEmpty().withMessage("Street address is required"),

  body("city").trim().notEmpty().withMessage("City is required"),

  body("state").trim().notEmpty().withMessage("State is required"),

  body("postalCode").trim().notEmpty().withMessage("Postal Code is required"),

  body("country").trim().notEmpty().withMessage("Country is required"),

  // For Education qualification from your form (major is closest)
  body("major")
    .trim()
    .notEmpty()
    .withMessage("Education qualification (Major) is required"),

  // GPA or score validation (you use "score")
  body("score").trim().notEmpty().withMessage("Score is required"),

  body("experience") // Experience field in your form is a select named 'experience' (years of experience)
    .notEmpty()
    .withMessage("Years of experience is required")
    .isInt({ min: 0, max: 50 })
    .withMessage("Invalid experience"),

  body("statement")
    .trim()
    .notEmpty()
    .withMessage("Personal statement is required")
    .isLength({ min: 20 })
    .withMessage("Statement must be at least 20 characters"),
];

// Validation middleware
export const validateRequest = (req, res, next) => {
  // No JSON parse needed, fields come as flat req.body in multipart form
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
