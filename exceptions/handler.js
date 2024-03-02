import { BadRequestException } from "./BadRequestException.js";
import { NotFoundException } from "./NotFoundException.js";

export function notFoundErrorHandler(req, res, next) {
  next(new NotFoundException("URL not found."));
}

export function errorHandler(err, req, res, next) {
  if (err instanceof BadRequestException) {
    return res.status(400).json({ message: err.message });
  }

  if (err instanceof NotFoundException) {
    return res.status(404).json({ message: err.message });
  }

  return res.status(500).json({ message: err.message });
}
