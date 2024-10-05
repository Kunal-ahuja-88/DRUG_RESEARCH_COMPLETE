"use server";

import { handleError } from "../utils";
import { connectToDatabase } from "../database/mongoose";
import mongoose from "mongoose";
import MoleculeGenerationHistory from "../database/models/molecule-generation.model";

export async function createMolecularGenerationHistory(
  payload: MolecularGenerationHistoryType,
  userId: string
) {
  try {
    await connectToDatabase();

    const newHistoryEntry = await MoleculeGenerationHistory.create({
      ...payload,
      user: new mongoose.Types.ObjectId(userId),
    });

    return JSON.parse(JSON.stringify(newHistoryEntry));
  } catch (error) {
    console.log("Error creating new entry for history", error);
    handleError(error);
  }
}

export async function getMolecularGenerationHistoryByUser(userId: string) {
  try {
    await connectToDatabase();

    const historyEntries = await MoleculeGenerationHistory.find({
      user: userId,
    }).sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(historyEntries));
  } catch (error) {
    console.error("Error retrieving history entries:", error);
    handleError(error);
  }
}

export async function getMolecularGenerationHistoryById(historyId: string) {
  try {
    await connectToDatabase();

    const historyEntry = await MoleculeGenerationHistory.findById(historyId);
    if (!historyEntry) throw new Error("History entry not there");

    return JSON.parse(JSON.stringify(historyEntry));
  } catch (error) {
    console.error("Error retrieving history entry by ID:", error);
    handleError(error);
  }
}
export async function deleteMolecularGenerationHistory(entryId: string) {
  try {
    await connectToDatabase();

    const deletedEntry = await MoleculeGenerationHistory.findByIdAndDelete(
      entryId
    );
    return JSON.parse(JSON.stringify(deletedEntry));
  } catch (error) {
    console.log("error deleting history entry", error);
    handleError(error);
  }
}
