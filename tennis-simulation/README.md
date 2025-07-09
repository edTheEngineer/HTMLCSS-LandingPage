# Tennis Tournament Simulation

A comprehensive tennis tournament simulation featuring a 128-player single elimination bracket with realistic scoring validation and accessible design.

## Features

### 🏆 Tournament Management
- **128 Random Players**: Automatically generates 128 unique players with realistic names and seeds
- **7 Tournament Rounds**: Complete bracket from Round 1 (128→64) to Final (2→1)
- **Progressive Match Availability**: Matches only become available when both participants are ready
- **Real-time Bracket Updates**: Visual updates as matches are completed

### 🎯 Tennis Scoring System
- **Realistic Score Validation**: Enforces proper tennis set scoring rules
- **Best of 3 Sets**: Matches require winning 2 out of 3 sets
- **Score Format Validation**: Validates set scores (6-4, 7-5, 7-6, etc.)
- **Winner Selection**: Must match the entered score for validation

### ♿ Accessibility Features
- **WCAG 2.1 Compliant**: High contrast ratios and proper color usage
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators and logical tab order
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### 📊 Export Functionality
- **JSON Export**: Complete tournament data with match results
- **CSV Export**: Spreadsheet-compatible format for analysis
- **Real-time Export**: Export at any stage of the tournament
- **Tournament Statistics**: Track completion status and match results

## How to Use

### Getting Started
1. Open `index.html` in a web browser
2. The tournament automatically generates 128 players on load
3. Click on any available (yellow-highlighted) match to enter scores

### Playing Matches
1. **Click** on an available match to open the score input modal
2. **Enter scores** for each set (e.g., 6-4, 6-2, or 6-4, 3-6, 6-2)
3. **Select the winner** using the radio buttons
4. **Save** the score to advance the winner to the next round

### Score Validation Rules
- Sets must be won by at least 2 games (except 7-6)
- Valid set scores: 6-0, 6-1, 6-2, 6-3, 6-4, 7-5, 7-6
- Must complete at least 2 sets
- Winner must win 2 out of 3 sets
- Selected winner must match the score entered

### Tournament Progression
- **Round 1**: All 64 matches are immediately available
- **Subsequent Rounds**: Matches become available only when both players have advanced
- **Automatic Advancement**: Winners automatically populate the next round
- **Tournament Completion**: Shows champion when final match is completed

### Export Options
- **During Tournament**: Export current progress at any time
- **After Completion**: Export final results with champion
- **Multiple Formats**: Both JSON and CSV files are generated
- **File Naming**: Files include the current date for organization

## Technical Features

### Architecture
- **Class-based JavaScript**: Modular `TournamentManager` class
- **Event-driven Design**: Responsive to user interactions
- **Data Validation**: Comprehensive input validation
- **Error Handling**: User-friendly error messages

### Accessibility Implementation
- **Semantic HTML5**: Proper heading hierarchy and landmarks
- **ARIA Attributes**: Labels, roles, and live regions
- **Focus Management**: Logical tab order and focus trapping
- **Color Accessibility**: Sufficient contrast ratios
- **Motion Preferences**: Respects reduced motion settings

### Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **ES6+ Features**: Uses modern JavaScript features
- **CSS Grid/Flexbox**: Modern layout techniques
- **Local Storage**: Tournament state persistence (future feature)

## File Structure

```
tennis-simulation/
├── index.html          # Main HTML structure
├── styles.css          # Accessible CSS styling
├── script.js          # Tournament logic and interactions
└── README.md          # Documentation
```

## Keyboard Shortcuts

- **Tab**: Navigate through available matches
- **Enter/Space**: Open score modal for focused match
- **Escape**: Close any open modal
- **Tab in Modal**: Navigate through form inputs

## Customization Options

### Player Generation
Modify the `playerNames` object in `script.js` to use different name pools:
```javascript
playerNames = {
    firstNames: ['Custom', 'Names', '...'],
    lastNames: ['Custom', 'Surnames', '...']
}
```

### Tournament Format
Change tournament size by modifying:
- Player count in `generateNewTournament()`
- Round count in `createTournament()`
- HTML round containers in `index.html`

### Styling
Customize appearance by modifying:
- Color scheme in CSS custom properties
- Typography in the body selector
- Layout spacing in the tournament container

## Future Enhancements

### Planned Features
- [ ] Save/Load tournament state
- [ ] Player statistics tracking
- [ ] Different tournament formats (double elimination)
- [ ] Real player database integration
- [ ] Print-friendly bracket view
- [ ] Tournament scheduling with dates/times

### Technical Improvements
- [ ] PWA (Progressive Web App) support
- [ ] Offline functionality
- [ ] Database integration
- [ ] Real-time multiplayer
- [ ] Mobile app version

## Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 80+     | ✅ Full |
| Firefox | 75+     | ✅ Full |
| Safari  | 13+     | ✅ Full |
| Edge    | 80+     | ✅ Full |

## Performance

- **Initial Load**: < 2 seconds for 128 players
- **Match Updates**: Real-time rendering
- **Memory Usage**: Efficient data structures
- **Export Speed**: Instant JSON/CSV generation

## Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Implement changes with accessibility in mind
4. Test across different browsers and devices
5. Submit a pull request

## License

This project is open source and available under the MIT License.

---

**Enjoy your tennis tournament simulation!** 🎾

For questions or suggestions, please open an issue or contact the development team.