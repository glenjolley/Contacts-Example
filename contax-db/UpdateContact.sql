CREATE PROCEDURE [dbo].[UpdateContact]
	@ID INT,
	@FirstName NVARCHAR(255),
	@LastName NVARCHAR(255)

AS

UPDATE 
	Contacts
SET 
	FirstName = @FirstName, LastName = @LastName
WHERE
	ID = @ID
