package com.jvlcode.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jvlcode.todo.model.Task;

public interface TaskRepository extends JpaRepository<Task,Long> {

}
