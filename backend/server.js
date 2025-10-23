import express from 'express';
import cors from 'cors';
import echoRoutes from './routes/echoRoutes.js';
import systemRoutes from './routes/systemRoutes.js';
import versionRoutes from './routes/versionRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import { loggerMiddleware } from './middleware/LoggerMiddleware.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import { PORT } from './config/envConfig.js';
import pastryRoutes from './routes/pastryRoutes.js';
import cakeDesignerRoutes from './routes/cakeDesignerroutes.js';
import echoRecipeProRoutes from './routes/echoRecipeProRoutes.js';
import moduleUploadRoutes from './routes/moduleUpload.js';

const app = express();

// Increase request timeout to 15 minutes (900s) to match upload timeout
app.use((req, res, next) => {
  req.setTimeout(900000); // 15 minutes
  res.setTimeout(900000); // 15 minutes
  next();
});

app.use(cors());
app.use(express.json({ limit: '2gb' }));
app.use(express.urlencoded({ limit: '2gb', extended: true }));
app.use(loggerMiddleware);

app.use('/api/cake-designer', authMiddleware, cakeDesignerRoutes);
app.use('/api/echo', echoRoutes);
app.use('/api/system', authMiddleware, systemRoutes);
app.use('/api/version', versionRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/pastry', authMiddleware, pastryRoutes);
app.use('/api/echo-recipe-pro', authMiddleware, echoRecipeProRoutes);
app.use('/api/modules', moduleUploadRoutes);
app.listen(PORT || 3001, () => {
  console.log(`LUCCCA Core Backend running on port ${PORT || 3001}`);
});
