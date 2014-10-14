@id AS int
@clientID AS int
@typeID AS int
@title AS nvarchar(250)
@description AS text




UPDATE Project SET 
id=@id
clientID=@clientID
typeID=@typeID
title=@title
description=@description
WHERE id = @id
