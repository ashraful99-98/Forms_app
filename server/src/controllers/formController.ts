import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import { FormModel } from '../models/FormModel';

// create form 
export const createForm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { createdBy, name, description } = req.body;

    if (!createdBy || !name) {
      res.status(400).json({ message: 'createdBy and name are required.' });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(createdBy)) {
      res.status(400).json({ message: 'Invalid user ID.' });
      return;
    }

    const userExists = await User.findById(createdBy);
    if (!userExists) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    const newForm = new FormModel({
      createdBy,
      name,
      description,
      questions: [],     
      formType: 'anonymous', 
      stared: false,
    });

    const savedForm = await newForm.save();

    await User.updateOne(
      { _id: createdBy },
      { $addToSet: { createdForms: savedForm._id } }
    );

    console.log('Form ID added to user\'s details');

    res.status(201).json(savedForm);
  } catch (error) {
    console.error('Error creating form:', error);
    next(error);
  }
};

// forms get 
export const formsGet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await FormModel.find().lean();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

// get single form 
export const getFormById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const formId = req.params.formId;

    const form = await FormModel.findById(formId);

    if (!form) {
      res.status(404).json({ message: 'Form not found' });
      return;
    }

    res.status(200).json(form);
  } catch (error) {
    console.error('Error fetching form by ID:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

// delete form 
export const deleteForm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const formId = req.params.formId;
    const userId = req.params.userId;

    console.log('Deleting Form ID:', formId);
    console.log('User ID:', userId);

    const form = await FormModel.findById(formId);

    if (!form) {
      res.status(404).json({ message: 'Form not found or already deleted' });
      return;
    }

    // Convert to string for comparison
    if (form.createdBy.toString() === userId) {
      await form.deleteOne();
      console.log('Form deleted');
      res.status(202).json({ message: 'Form deleted' });
    } else {
      res.status(401).json({ message: 'You are not the owner of this form' });
    }
  } catch (error) {
    console.error('Error deleting form:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

// edit form 
export const editForm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const formId = req.body.formId;

    const data = {
      name: req.body.name,
      description: req.body.description,
      questions: req.body.questions,
    };

    console.log("Received form data for update:", data);

    const updatedForm = await FormModel.findByIdAndUpdate(formId, data, { new: true });

    if (!updatedForm) {
      res.status(404).json({ message: 'Form not found' });
      return;
    }

    res.status(200).json(updatedForm);
  } catch (error) {
    console.error("Error updating form:", error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
