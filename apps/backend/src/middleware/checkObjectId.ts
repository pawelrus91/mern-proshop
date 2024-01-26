import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';

const checkObjectId = (req: Request, res: Response, next: NextFunction) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error(`Invalid Object Id of: ${req.params.id}`);
  }

  next();
};

export default checkObjectId;
