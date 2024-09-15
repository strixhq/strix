export function existsSync(
	path: string | URL,
	options?: ExistsOptions,
  ): boolean {
	try {
	  const stat = Deno.statSync(path);
	  if (
		options &&
		(options.isReadable || options.isDirectory || options.isFile)
	  ) {
		if (options.isDirectory && options.isFile) {
		  throw new TypeError(
			"ExistsOptions.options.isDirectory and ExistsOptions.options.isFile must not be true together",
		  );
		}
		if (
		  (options.isDirectory && !stat.isDirectory) ||
		  (options.isFile && !stat.isFile)
		) {
		  return false;
		}
		if (options.isReadable) {
		  return fileIsReadable(stat);
		}
	  }
	  return true;
	} catch (error) {
	  if (error instanceof Deno.errors.NotFound) {
		return false;
	  }
	  if (error instanceof Deno.errors.PermissionDenied) {
		if (
		  Deno.permissions.querySync({ name: "read", path }).state === "granted"
		) {
		  // --allow-read not missing
		  return !options?.isReadable; // PermissionDenied was raised by file system, so the item exists, but can't be read
		}
	  }
	  throw error;
	}
  }
  
  function fileIsReadable(stat: Deno.FileInfo) {
	if (stat.mode === null) {
	  return true; // Exclusive on Non-POSIX systems
	} else if (Deno.uid() === stat.uid) {
	  return (stat.mode & 0o400) === 0o400; // User is owner and can read?
	} else if (Deno.gid() === stat.gid) {
	  return (stat.mode & 0o040) === 0o040; // User group is owner and can read?
	}
	return (stat.mode & 0o004) === 0o004; // Others can read?
  }