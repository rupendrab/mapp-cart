import {defineConfig} from 'vite'
import dotenv from 'dotenv';

dotenv.config()

export default defineConfig({
	plugins: [],
	define: {
		__FIREBASE_DB__: `"${process.env.FIREBASE_DB}"` 
	}	
})
