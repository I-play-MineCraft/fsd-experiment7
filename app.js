// this program needs mongodb app if it not installed then install it in the https://www.mongodb.com/try/download/community
// scroll down and download the msi file and installit 
// to run this code u have to write code in the terminal 
// node app.py 
// but before running the code u have to install the dependencies by simply write
// npm install mongodb 
// now u can run

const { MongoClient } = require('mongodb');
// MongoDB Connection URI and Database Name
const uri = 'mongodb://localhost:27017'; // Replace with your URI
const dbName = 'myDatabase'; // Replace with your database name
// Main function to perform Create, Read, Update, and Delete operations
async function main() {
 const client = new MongoClient(uri);
 try {
 // Connect to the MongoDB server
 await client.connect();
 console.log('Connected to MongoDB');
 // Access the database and collection
 const db = client.db(dbName);
 const collection = db.collection('myCollection'); // Replace with your collection name
 // CREATE Operation: Insert documents
 const newDocuments = [
 { name: 'Alice', age: 25, city: 'New York' },
 { name: 'Bob', age: 30, city: 'San Francisco' },
 ];
 const insertResult = await collection.insertMany(newDocuments);
 console.log(`${insertResult.insertedCount} documents inserted`);
 // READ Operation: Retrieve documents
 const query = { city: 'New York' }; // Specify a query to filter results
 const documents = await collection.find(query).toArray();
 console.log('Retrieved documents:');
 console.log(documents);
 // UPDATE Operation: Update a document
 const updateFilter = { name: 'Alice' }; // Document to update
 const updateData = { $set: { age: 26, city: 'Boston' } }; // Update details
 const updateResult = await collection.updateOne(updateFilter, updateData);
 console.log(`${updateResult.modifiedCount} document(s) updated`);
 // DELETE Operation: Delete a document
 const deleteFilter = { name: 'Bob' }; // Document to delete
 const deleteResult = await collection.deleteOne(deleteFilter);
 console.log(`${deleteResult.deletedCount} document(s) deleted`);
 // Final READ to confirm changes
 const allDocuments = await collection.find().toArray();
 console.log('All documents after update and delete:');
 console.log(allDocuments);
 } catch (error) {
 console.error('An error occurred:', error);
 } finally {
 // Close the MongoDB connection
 await client.close();
 console.log('Connection closed');
 }
}
// Execute the main function
main();