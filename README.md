# Student Management System - Frontend Demo

A beautiful frontend demo of a library seat management system built with Next.js and TailwindCSS.

## Features

### Frontend Demo Features
- **Interactive Dashboard**: Beautiful admin dashboard with sample data
- **Visual Seat Map**: 40-seat library layout with real-time availability
- **Student Management**: Add, edit, delete students with form validation
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, professional interface with TailwindCSS

### Demo Functionality
- **Sample Data**: Pre-loaded with demo students and seat assignments
- **Interactive Forms**: Modal forms for adding/editing students
- **Seat Visualization**: Color-coded seat map (Green = Available, Red = Occupied)
- **Statistics Cards**: Real-time stats for students, seats, and unpaid fees
- **Toast Notifications**: User feedback for all actions

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Quick Start

### 1. Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### 2. Access the Demo

1. Visit `http://localhost:3000`
2. Click "View Demo Dashboard"
3. Explore the interactive features!

## Demo Features

### Seat Map
- Visual representation of all 40 library seats
- Color-coded availability status
- Click on available seats to assign students
- Hover tooltips showing seat details

### Student Management
- Add new students with form validation
- Edit existing student information
- Delete students (with confirmation)
- Sortable table with student details

### Statistics Dashboard
- Total students count
- Available seats counter
- Unpaid fees tracker
- Real-time updates

## Project Structure

```
├── app/
│   ├── dashboard/           # Main dashboard page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── [SEO files]         # SEO optimization
├── components/
│   ├── SeatMap.tsx         # Interactive seat map
│   ├── StudentTable.tsx    # Student data table
│   └── StudentForm.tsx     # Student form modal
└── [config files]
```

## Demo Data

The application comes with sample data:
- 3 demo students with different fee statuses
- Pre-assigned seats (1, 5, 12)
- Realistic student information
- Various join dates

## Features in Detail

### Seat Map Component
- 8x5 grid layout (40 total seats)
- Interactive seat selection
- Visual status indicators
- Responsive design

### Student Table
- Sortable columns
- Action buttons (Edit, Delete, Send Reminder)
- Status badges for fee payment
- Empty state handling

### Student Form
- Modal-based form
- Form validation
- Seat selection dropdown
- Fee status selection

## Customization

### Adding More Demo Data
Edit the `students` state in `app/dashboard/page.tsx` to add more sample data.

### Styling
All styles use TailwindCSS classes. Customize colors, spacing, and layout in the component files.

### Components
Each component is modular and can be easily customized or extended.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Fast loading with Next.js optimization
- Responsive images and components
- Optimized bundle size
- Smooth animations and transitions

## License

This project is open source and available under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
#live www.studyfilibrary.com


**Note**: This is a frontend demo with sample data. All changes are temporary and will reset on page refresh.
