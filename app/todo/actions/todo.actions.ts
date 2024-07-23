"use server";
import { prisma } from "@/libs/prismadb";
import { revalidatePath } from "next/cache"

export const createTodo = async (title: string) => {
   
    if (!title || !title.trim()) {
        return {
            error: "El titulo es obligatorio (BackEnd)"
        }}
   
    try {
     await prisma.todo.create({
        data: {
            title,
         },
    });

   revalidatePath("/todo");
   
   return {
    success: true
   }} catch (error) {
    return{
        error: "Error creando el To Do (BackEnd)"
    }}
  };

  export const removeTodo = async(id: string) => {

    if(!id || !id.trim()){
        return{
            error: "Id requerido (BackEnd)"
        }
    }
    try {
        await prisma.todo.delete({
            where:{
                id
            }
        });
        revalidatePath("/todo")
        return {
            success: true, 
        }
    } catch (error) {
        return{
            error: "Error eliminando To Do (BackEnd)"
        }
    }
  }