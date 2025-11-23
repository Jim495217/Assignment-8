const sequelize = require('../config/database');
const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');
const bcrypt = require('bcryptjs');

const setupDatabase = async () => {
  try {
    console.log('Setting up database...');

    // Sync all models and recreate tables
    await sequelize.sync({ force: true });
    console.log('✅ Database synced successfully.');

    // --------------------
    // Seed Users with hashed passwords
    // --------------------
    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('password456', 10);

    const user1 = await User.create({
      username: 'alice',
      email: 'alice@example.com',
      password: hashedPassword1
    });

    const user2 = await User.create({
      username: 'bob',
      email: 'bob@example.com',
      password: hashedPassword2
    });

    console.log('✅ Users created.');

    // --------------------
    // Seed Projects
    // --------------------
    const project1 = await Project.create({
      title: 'Alice Project 1',
      description: 'First project for Alice',
      userId: user1.id
    });

    const project2 = await Project.create({
      title: 'Bob Project 1',
      description: 'First project for Bob',
      userId: user2.id
    });

    console.log('✅ Projects created.');

    // --------------------
    // Seed Tasks
    // --------------------
    await Task.create({
      title: 'Alice Task 1',
      completed: false,
      projectId: project1.id
    });

    await Task.create({
      title: 'Alice Task 2',
      completed: true,
      projectId: project1.id
    });

    await Task.create({
      title: 'Bob Task 1',
      completed: false,
      projectId: project2.id
    });

    console.log('✅ Tasks created.');
    console.log('🎉 Database setup complete!');

  } catch (err) {
    console.error('Error setting up database:', err);
  } finally {
    await sequelize.close();
    console.log('Database connection closed.');
  }
};

setupDatabase();
