CREATE PROCEDURE [dbo].[AddNewContact]
	@FirstName NVARCHAR(255),
	@LastName NVARCHAR(255),
	@NewContactID INT OUTPUT
AS
	INSERT INTO Contacts (FirstName, LastName)
	VALUES (@FirstName,@LastName)

	SET @NewContactID = SCOPE_IDENTITY();
