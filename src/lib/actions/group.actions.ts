"use server";
import Group from "../database/models/group.model";
import mongoose from "mongoose";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

export async function createGroup(
  groupName: string,
  creatorId: string,
  memberIds: string[] = []
) {
  try {
    await connectToDatabase();

    const members = Array.from(
      new Set([
        creatorId,
        ...memberIds.map((id) => new mongoose.Types.ObjectId(id)),
      ])
    );
    const newGroup = await Group.create({
      name: groupName,
      createdBy: creatorId,
      members,
    });
    return JSON.parse(JSON.stringify(newGroup));
  } catch (error) {
    console.log("Error creating group", error);
    throw new Error("Error creating new group");
  }
}

export async function addMemberToGroup(groupId: string, userId: string) {
  try {
    await connectToDatabase();

    const group = await Group.findById(groupId);
    if (!group) throw new Error("Group doesnt exist");

    if (!group.members.includes(groupId)) {
      group.members.push(groupId);
      await group.save();
    }
    return JSON.parse(JSON.stringify(group));
  } catch (error) {
    throw new Error("Error adding memebr to the group");
    handleError(error);
  }
}

export async function addMessageToGroup(
  groupId: string,
  userId: string,
  text: string
) {
  try {
    await connectToDatabase();

    const group = await Group.findById(groupId);
    if (!group) throw new Error("Group doesnt exist");

    const message = {
      sender: userId,
      text,
    };

    group.messages.push(message);
    await group.save();

    return JSON.parse(JSON.stringify(group));
  } catch (error) {
    console.log("Error adding message to the group", error);
    handleError(error);
  }
}

export async function getGroupById(groupId: string) {
  try {
    await connectToDatabase();

    const groups = await Group.findById(groupId).populate(
      "members",
      "firstName lastName photo"
    );
    if (!groups) throw new Error("Group doest exist");

    return JSON.parse(JSON.stringify(groups));
  } catch (error) {
    console.error("Error retrieving groups:", error);
    handleError(error);
  }
}

export async function getGroupMessages(groupId: string) {
  try {
    await connectToDatabase();

    const group = await Group.findById(groupId).populate(
      "messages.sender",
      "firstName lastName photo"
    );
    if (!group) throw new Error("Group not found");

    return JSON.parse(JSON.stringify(group));
  } catch (error) {
    console.error("Error retrieving group messages:", error);
    handleError(error);
  }
}
