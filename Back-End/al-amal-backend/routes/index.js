const authRouter = require('./authRoutes');
const userRouter = require('./userRoutes');
const adminRouter = require('./adminRoutes');
const sponsoredRouter = require('./sponsoredRoutes');
const courseRouter = require('./courseRoutes');
const assignRouter = require('./assignRoutes');

const routes = (app) => {
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/admin', adminRouter);
  app.use('/api/v1/sponsored', sponsoredRouter);
  app.use('/api/v1/course', courseRouter);
  app.use('/api/v1/assign', assignRouter);
};

module.exports = routes;
