"use server";

import { taskSchema } from "@repo/common-types";
import { createClient } from "@/app/lib/supabase-server";
import { revalidatePath } from "next/cache";


export async function addTask(title: string) {
  const validated = taskSchema.safeParse({ title });

  if (!validated.success) {
    return { error: "Task title cannot be empty" };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "User is not logged in" };
  }

  const { error } = await supabase.from("tasks").insert({
    title: validated.data.title,
    completed: false,
    user_id: user.id,
  });

  if (error) {
    console.error("Error adding task:", error);
    return { error: error.message };
  }

  revalidatePath("/");

  return { success: true };
}

export async function updateTask(
  id: number,
  title?: string,
  completed?: boolean
) {
  const supabase = await createClient();

  const updateData: {
    title?: string;
    completed?: boolean;
  } = {};

  if (title !== undefined) {
  const validated = taskSchema.safeParse({ title });

  if (!validated.success) {
    return { error: "Task title cannot be empty" };
  }

  updateData.title = validated.data.title;
}

  if (completed !== undefined) {
    updateData.completed = completed;
  }

  const { error } = await supabase
    .from("tasks")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Error updating task:", error);
    return { error: error.message };
  }

  revalidatePath("/");

  return { success: true };
}

export async function deleteTask(id: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting task:", error);
    return { error: error.message };
  }

  revalidatePath("/");

  return { success: true };
}

