 import mongoose from 'mongoose';
 import User from '../models/User.js';

 async function getSortedRatings(userType) {
   try {
     // Fetch all users of the specified type
     const users = await User.find({ role: userType });
     if (!users || users.length === 0) {
       throw new Error('No users found for the specified type');
     }

     // Sort users by ratings in descending order
     const sortedUsers = users.sort((a, b) => {
       return b.ratings.score - a.ratings.score;
     });

     return sortedUsers;
   } catch (error) {
     console.error('Error fetching sorted ratings:', error);
     throw error;
   }
 }