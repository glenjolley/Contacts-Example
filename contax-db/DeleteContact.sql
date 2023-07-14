CREATE PROCEDURE [dbo].[DeleteContact]
	@ID INT
AS
	DELETE FROM Contacts WHERE ID = @ID;
