CREATE PROCEDURE [dbo].[GetContacts]
AS
	SELECT
		c.ID,
		c.FirstName,
		c.LastName
	FROM
		Contacts AS c