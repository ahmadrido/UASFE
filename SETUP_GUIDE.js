/**
 * SETUP GUIDE FOR MOVIE EXPLORER APP
 * 
 * Follow these steps to get your Movie Explorer App running:
 */

/* 
===========================================
STEP 1: GET YOUR TMDB API KEY (OPTIONAL)
===========================================

The app works with dummy data by default, but for full functionality:

1. Go to: https://www.themoviedb.org/
2. Create a free account
3. Go to Settings > API
4. Request an API Key (choose "Developer" option)
5. Copy your API Key (v3 auth)
6. Open src/services/api.js
7. Replace 'YOUR_TMDB_API_KEY' with your actual key

Example:
const API_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';

===========================================
STEP 2: INSTALL DEPENDENCIES
===========================================

Run this command in your terminal:
npm install

This will install:
- React & React DOM
- React Router DOM
- Tailwind CSS
- Vite

===========================================
STEP 3: START THE DEV SERVER
===========================================

Run:
npm run dev

The app will start at http://localhost:5173

===========================================
STEP 4: TEST THE APP
===========================================

✓ Browse popular movies on the home page
✓ Search for a movie (e.g., "Inception")
✓ Click on a movie card to see details
✓ Click the back button to return
✓ Test on mobile view (resize browser)

===========================================
TROUBLESHOOTING
===========================================

Problem: Movies not loading
Solution: Check if API key is set, or just use dummy data

Problem: Styles not working
Solution: Make sure Tailwind is configured in vite.config.js

Problem: Can't navigate to detail page
Solution: Verify react-router-dom is installed

Problem: Port already in use
Solution: Change port in vite.config.js or stop other apps

===========================================
FOR PRESENTATION
===========================================

1. Make sure dummy data is working (don't need API key!)
2. Test all features beforehand
3. Have backup screenshots ready
4. Explain component structure
5. Show responsive design on different devices
6. Demonstrate error handling

===========================================
READY FOR DEMO? 
===========================================

Your Movie Explorer App includes:
✓ 4 reusable components
✓ 2 main pages
✓ API service layer with error handling
✓ Dummy data fallback
✓ Responsive design
✓ Loading states
✓ Search functionality
✓ Clean, documented code

Good luck with your presentation! 🎬🍿
*/
