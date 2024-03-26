const Task = require("../models/taskSchema")


const addTask = async(req,res)=>{
    try{
        const {title,desc} = req.body
        const personId = req.body.personId
        const newTask = await Task.create({title,desc,owner:personId})
        res.status(201).json({msg:"Task created!" , Task: newTask})
    }
    catch (error) {
        res.status(500).json({msg:"Something went wrong..." , error:error.message})
    }
}

const getTasks = async(req,res)=>{
    try{
        const tasks = await Task.find({owner: req.body.personId})
        res.status(201).json({msg:"Got all tasks!" , tasks: tasks})
    }
    catch (error) {
        res.status(500).json({msg:"Something went wrong..." , error:error.message})
    }
}

const updateTask = async(req,res)=>{
    try{
        const task = await Task.findByIdAndUpdate({_id: req.params.id} , {...req.body})
        res.status(201).json({msg:"Task updated successfully!" , task: task})
    }
    catch (error) {
        res.status(500).json({msg:"Something went wrong..." , error:error.message})
    }
}

const deleteTask = async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete({_id: req.params.id})
        res.status(201).json({msg:"Task has been deleted successfully!" , task: task})
    }
    catch (error) {
        res.status(500).json({msg:"Something went wrong..." , error:error.message})
    }
}



module.exports={addTask,getTasks,updateTask,deleteTask}