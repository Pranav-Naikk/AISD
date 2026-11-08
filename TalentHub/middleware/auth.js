exports.requireAuth=(req,res,next)=>req.session.user?next():res.status(401).json({message:'Sign in is required.'});
exports.requireRole=(...roles)=>(req,res,next)=>roles.includes(req.session.user?.role)?next():res.status(403).json({message:'You are not authorised for this action.'});
