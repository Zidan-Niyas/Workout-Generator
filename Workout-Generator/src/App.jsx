import { useEffect, useState } from 'react'

function App() {
  const [location, setLocation] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [split, setSplit] = useState('');
  const [splitLength, setSplitLength] = useState(0);
  const [displayLocation, setDisplayLocation] = useState('');
  const [displayDifficulty, setDisplayDifficulty] = useState('');
  const [displayWorkout, setDisplayWorkout] = useState([]);
  const [displayDay, setDisplayDay] = useState([]);

  const handleSplitChange = (value, length) => {
    setSplit(value);
    setSplitLength(length);
  }


  // Main function that executes when the Generate Workout button is clicked
  const handleSubmit = (event) => {

    event.preventDefault();
    const daysDisplayed = [];
    let selectedWorkoutPlan = {};
    const days = ["day1", "day2", "day3", "day4", "day5", "day6"];

    // Full Body Exercises
    const fullBody = {
      Home: {
        beginner: {
          day1: [
            "Bodyweight Squats (3x10-12)",
            "Push-ups (3x8-10)",
            "Dumbbell Lunges (3x10-12 per leg)",
            "Dumbbell Rows (3x10-12 per arm)",
            "Plank (3x30 seconds to 1 minute)"
          ],
          day2: [
            "Dumbbell Shoulder Press (3x8-10)",
            "Bodyweight Step-ups (3x10-12 per leg)",
            "Dumbbell Chest Press (3x8-10)",
            "Bodyweight Tricep Dips (3x8-10)",
            "Russian Twists (3x15-20)"
          ],
          day3: [
            "Deadlifts with Dumbbells (3x8-10)",
            "Reverse Lunges (3x10-12 per leg)",
            "Bicep Curls with Dumbbells (3x8-10)",
            "Mountain Climbers (3x20-30 seconds)",
            "Superman (3x12-15)"
          ]
        },
        intermediate: {
          day1: [
            "Barbell Squats (4x8-10)",
            "Push-ups (4x8-10)",
            "Dumbbell Romanian Deadlifts (4x8-10)",
            "Pull-ups (4x6-8)",
            "Plank (4x30 seconds to 1 minute)"
          ],
          day2: [
            "Dumbbell Shoulder Press (4x8-10)",
            "Jump Squats (4x8-10)",
            "Dumbbell Bench Press (4x8-10)",
            "Tricep Dips (4x8-10)",
            "Russian Twists with Medicine Ball (4x15-20)"
          ],
          day3: [
            "Barbell Deadlifts (4x6-8)",
            "Walking Lunges with Dumbbells (4x10-12 per leg)",
            "Barbell Bicep Curls (4x8-10)",
            "Mountain Climbers (4x20-30 seconds)",
            "Hollow Body Hold (4x20-30 seconds)"
          ]
        },
        advanced: {
          day1: [
            "Barbell Squats (5x5)",
            "Handstand Push-ups (5x5-8)",
            "Barbell Romanian Deadlifts (5x5)",
            "Weighted Pull-ups (5x5-8)",
            "Plank (5x30 seconds to 1 minute)"
          ],
          day2: [
            "Overhead Press (5x5)",
            "Box Jumps (5x5-8)",
            "Barbell Bench Press (5x5)",
            "Weighted Dips (5x5-8)",
            "Russian Twists with Weighted Medicine Ball (5x15-20)"
          ],
          day3: [
            "Deadlifts (5x5)",
            "Walking Lunges with Barbell (5x8-10 per leg)",
            "Barbell Curl (5x5-8)",
            "Mountain Climbers (5x20-30 seconds)",
            "Hollow Body Hold (5x20-30 seconds)"
          ]
        }

      },
      Gym: {
        beginner: {
          day1: [
            "Leg Press (3x10-12)",
            "Lat Pulldown (3x10-12)",
            "Dumbbell Bench Press (3x10-12)",
            "Seated Cable Row (3x10-12)",
            "Plank (3x30 seconds to 1 minute)"
          ],
          day2: [
            "Leg Extension (3x10-12)",
            "Dumbbell Shoulder Press (3x10-12)",
            "Cable Bicep Curls (3x10-12)",
            "Tricep Rope Pushdowns (3x10-12)",
            "Russian Twists with Medicine Ball (3x15-20)"
          ],
          day3: [
            "Barbell Squats (3x10-12)",
            "Pull-ups (3x6-8)",
            "Dumbbell Flyes (3x10-12)",
            "Barbell Rows (3x10-12)",
            "Hanging Leg Raises (3x10-15)"
          ]
        },
        intermediate: {
          day1: [
            "Barbell Squats (4x8-10)",
            "Pull-ups (4x6-8)",
            "Barbell Bench Press (4x8-10)",
            "Barbell Rows (4x8-10)",
            "Plank (4x30 seconds to 1 minute)"
          ],
          day2: [
            "Deadlifts (4x6-8)",
            "Dumbbell Shoulder Press (4x8-10)",
            "Dumbbell Lunges (4x8-10 per leg)",
            "Dumbbell Bicep Curls (4x8-10)",
            "Tricep Dips (4x8-10)"
          ],
          day3: [
            "Leg Press (4x8-10)",
            "Lat Pulldown (4x8-10)",
            "Incline Dumbbell Bench Press (4x8-10)",
            "Seated Cable Row (4x8-10)",
            "Russian Twists with Weighted Medicine Ball (4x15-20)"
          ]
        },
        advanced: {
          day1: [
            "Barbell Squats (5x5)",
            "Weighted Pull-ups (5x5-8)",
            "Barbell Bench Press (5x5)",
            "Barbell Rows (5x5)",
            "Plank (5x30 seconds to 1 minute)"
          ],
          day2: [
            "Deadlifts (5x5)",
            "Standing Military Press (5x5)",
            "Walking Lunges with Barbell (5x8-10 per leg)",
            "Barbell Bicep Curls (5x5-8)",
            "Tricep Rope Pushdowns (5x5-8)"
          ],
          day3: [
            "Leg Press (5x5)",
            "Lat Pulldown (5x5-8)",
            "Incline Bench Press (5x5)",
            "Seated Cable Row (5x5-8)",
            "Hanging Leg Raises (5x10-15)"
          ]
        }

      }
    };

    // Bro Split Exercises
    const broSplit = {
      Gym: {
        beginner: {
          day1: [
            "Barbell Bench Press (3x10)",
            "Incline Dumbbell Press (3x12)",
            "Dumbbell Flyes (3x12)",
            "Push-ups (3x15)",
            "Cable Crossovers (3x12)"
          ],
          day2: [
            "Deadlifts (3x8)",
            "Pull-ups (3x8-10)",
            "Bent Over Barbell Rows (3x10)",
            "Seated Cable Rows (3x12)",
            "Lat Pulldowns (3x12)"
          ],
          day3: [
            "Overhead Barbell Press (3x10)",
            "Dumbbell Lateral Raises (3x12)",
            "Front Dumbbell Raises (3x12)",
            "Rear Delt Flyes (3x12)",
            "Arnold Press (3x10)"
          ],
          day4: [
            "Barbell Curl (3x10)",
            "Hammer Curls (3x12)",
            "Preacher Curls (3x10)",
            "Concentration Curls (3x12)",
            "Cable Bicep Curls (3x12)"
          ],
          day5: [
            "Tricep Dips (3x10)",
            "Skull Crushers (3x12)",
            "Tricep Rope Pushdowns (3x12)",
            "Close Grip Bench Press (3x10)",
            "Overhead Tricep Extension (3x12)"
          ]
        },
        intermediate: {
          day1: [
            "Chest: Incline Barbell Bench Press (4x8)",
            "Chest: Dumbbell Flyes (4x10)",
            "Chest: Cable Crossovers (4x12)",
            "Triceps: Close Grip Bench Press (4x8)",
            "Triceps: Tricep Rope Pushdowns (4x10)"
          ],
          day2: [
            "Back: Deadlifts (4x6)",
            "Back: Pull-ups (4x8-10)",
            "Back: Barbell Rows (4x8)",
            "Biceps: Barbell Curl (4x8)",
            "Biceps: Hammer Curls (4x10)"
          ],
          day3: [
            "Shoulders: Seated Dumbbell Press (4x8)",
            "Shoulders: Lateral Raises (4x10)",
            "Shoulders: Front Dumbbell Raises (4x10)",
            "Traps: Barbell Shrugs (4x12)",
            "Abs: Hanging Leg Raises (4x12)"
          ],
          day4: [
            "Legs: Squats (4x6)",
            "Legs: Leg Press (4x8)",
            "Legs: Romanian Deadlifts (4x8)",
            "Calves: Standing Calf Raises (4x12)",
            "Calves: Seated Calf Raises (4x12)"
          ],
          day5: [
            "Chest: Decline Bench Press (4x8)",
            "Chest: Dumbbell Pullover (4x10)",
            "Chest: Push-ups (4x15)",
            "Triceps: Skull Crushers (4x8)",
            "Triceps: Overhead Tricep Extension (4x10)"
          ]
        },
        advanced: {
          day1: [
            "Chest: Incline Barbell Bench Press (5x5)",
            "Chest: Dumbbell Flyes (5x8)",
            "Chest: Cable Crossovers (5x10)",
            "Triceps: Close Grip Bench Press (5x5)",
            "Triceps: Tricep Rope Pushdowns (5x8)"
          ],
          day2: [
            "Back: Deadlifts (5x5)",
            "Back: Weighted Pull-ups (5x5)",
            "Back: Barbell Rows (5x8)",
            "Biceps: Barbell Curl (5x8)",
            "Biceps: Hammer Curls (5x10)"
          ],
          day3: [
            "Shoulders: Military Press (5x5)",
            "Shoulders: Lateral Raises (5x8)",
            "Shoulders: Front Dumbbell Raises (5x8)",
            "Traps: Dumbbell Shrugs (5x12)",
            "Abs: Weighted Decline Sit-ups (5x15)"
          ],
          day4: [
            "Legs: Squats (5x5)",
            "Legs: Romanian Deadlifts (5x8)",
            "Legs: Leg Press (5x8)",
            "Calves: Standing Calf Raises (5x12)",
            "Calves: Seated Calf Raises (5x12)"
          ],
          day5: [
            "Chest: Bench Press (5x5)",
            "Chest: Incline Dumbbell Press (5x8)",
            "Chest: Push-ups (5x15)",
            "Triceps: Skull Crushers (5x8)",
            "Triceps: Overhead Tricep Extension (5x10)"
          ]
        }

      },
      Home: {
        beginner: {
          day1: [
            "Push-ups (3x10-12)",
            "Dumbbell Chest Press (3x10-12)",
            "Dumbbell Flyes (3x10-12)",
            "Chair Dips (3x10-12)",
            "Overhead Dumbbell Extension (3x10-12)"
          ],
          day2: [
            "Bodyweight Rows (3x10-12)",
            "Superman (3x12-15)",
            "Reverse Snow Angels (3x12-15)",
            "Dumbbell Hammer Curls (3x10-12)",
            "Resistance Band Bicep Curls (3x10-12)"
          ],
          day3: [
            "Bodyweight Squats (3x12-15)",
            "Lunges (3x10-12 per leg)",
            "Glute Bridges (3x12-15)",
            "Calf Raises (3x15-20)",
            "Bicycle Crunches (3x15-20)"
          ],
          day4: [
            "Pike Push-ups (3x10-12)",
            "Lateral Raises with Water Bottles (3x12-15)",
            "Front Raises with Water Bottles (3x12-15)",
            "Shrugs with Dumbbells (3x12-15)",
            "Plank (3x30 seconds to 1 minute)"
          ],
          day5: [
            "Burpees (3x10-12)",
            "Mountain Climbers (3x20-30 seconds)",
            "Jump Squats (3x10-12)",
            "Russian Twists with Dumbbell or Water Bottle (3x15-20)",
            "Plank to Push-up (3x8-10)"
          ]
        },
        intermediate: {
          day1: [
            "Push-ups (4x8-10)",
            "Dumbbell Chest Press (4x8-10)",
            "Decline Push-ups (4x8-10)",
            "Chair Dips (4x8-10)",
            "Overhead Dumbbell Extension (4x8-10)"
          ],
          day2: [
            "Bodyweight Rows (4x8-10)",
            "Superman (4x12-15)",
            "Reverse Snow Angels (4x12-15)",
            "Dumbbell Hammer Curls (4x8-10)",
            "Resistance Band Bicep Curls (4x8-10)"
          ],
          day3: [
            "Bodyweight Squats (4x10-12)",
            "Lunges (4x8-10 per leg)",
            "Glute Bridges (4x10-12)",
            "Calf Raises (4x12-15)",
            "Bicycle Crunches (4x15-20)"
          ],
          day4: [
            "Pike Push-ups (4x8-10)",
            "Lateral Raises with Water Bottles (4x10-12)",
            "Front Raises with Water Bottles (4x10-12)",
            "Shrugs with Dumbbells (4x12-15)",
            "Plank (4x30 seconds to 1 minute)"
          ],
          day5: [
            "Burpees (4x8-10)",
            "Mountain Climbers (4x20-30 seconds)",
            "Jump Squats (4x8-10)",
            "Russian Twists with Dumbbell or Water Bottle (4x15-20)",
            "Plank to Push-up (4x8-10)"
          ]
        },
        advanced: {
          day1: [
            "One-arm Push-ups (5x5-8 per arm)",
            "Weighted Dips (5x5-8)",
            "Incline Dumbbell Press (5x8-10)",
            "Skull Crushers (5x8-10)",
            "Close Grip Push-ups (5x10-12)"
          ],
          day2: [
            "Pull-ups (5x5-8)",
            "Inverted Rows (5x8-10)",
            "Single-arm Dumbbell Rows (5x8-10 per arm)",
            "Preacher Curls (5x8-10)",
            "Reverse Curls (5x10-12)"
          ],
          day3: [
            "Pike Push-ups with Feet Elevated (5x5-8)",
            "Dumbbell Shoulder Press (5x8-10)",
            "Lateral Raises (5x8-10)",
            "Front Raises with Plate (5x8-10)",
            "Handstand Push-ups (5x5-8)"
          ],
          day4: [
            "Pistol Squats (5x5-8 per leg)",
            "Dumbbell Bulgarian Split Squats (5x8-10 per leg)",
            "Jump Squats with Weighted Vest (5x8-10)",
            "Single-leg Calf Raises (5x10-12 per leg)",
            "Hanging Leg Raises (5x10-15)"
          ],
          day5: [
            "Diamond Push-ups (5x5-8)",
            "Towel Pull-ups (5x5-8)",
            "Chin-ups (5x8-10)",
            "Zottman Curls (5x8-10)",
            "Hanging Windshield Wipers (5x10-12)"
          ]
        }

      }
    };

    // PPL Exercises
    const ppl = {
      Home: {
        beginner: {
          day1: [
            "Push-ups (3x10-12)",
            "Dumbbell Shoulder Press (3x8-10)",
            "Dumbbell Lateral Raises (3x10-12)",
            "Tricep Dips (3x8-10)",
            "Tricep Kickbacks (3x10-12)",
            "Russian Twists (3x15-20)"
          ],
          day2: [
            "Resistance Band Rows (3x10-12)",
            "Bent Over Dumbbell Rows (3x8-10 per arm)",
            "Bicep Curls with Dumbbells (3x10-12)",
            "Reverse Flyes with Dumbbells (3x10-12)",
            "Hammer Curls with Dumbbells (3x10-12)",
            "Plank (3x30 seconds to 1 minute)"
          ],
          day3: [
            "Bodyweight Squats (3x12-15)",
            "Lunges (3x10-12 per leg)",
            "Glute Bridges (3x12-15)",
            "Calf Raises (3x15-20)",
            "Mountain Climbers (3x20-30 seconds)",
            "Hanging Leg Raises (3x10-15)"
          ],
          day4: [
            "Chair Dips (3x10-12)",
            "Arnold Press (3x8-10)",
            "Front Dumbbell Raises (3x10-12)",
            "Push-up Variations (3x8-12)",
            "Close Grip Push-ups (3x10-12)",
            "Russian Twists (3x15-20)"
          ],
          day5: [
            "Resistance Band Rows (3x10-12)",
            "Chin-ups (3x6-8)",
            "Resistance Band Bicep Curls (3x10-12)",
            "Face Pulls with Resistance Band (3x10-12)",
            "Reverse Grip Bicep Curls (3x10-12)",
            "Plank (3x30 seconds to 1 minute)"
          ],
          day6: [
            "Jump Squats (3x10-12)",
            "Single-Leg Romanian Deadlifts with Dumbbells (3x10-12 per leg)",
            "Step-ups (3x10-12 per leg)",
            "Calf Raises with Dumbbells (3x15-20)",
            "Russian Twists with Medicine Ball (3x15-20)",
            "Hollow Body Hold (3x20-30 seconds)"
          ]
        },
        intermediate: {
          day1: [ // Push
            "Push-ups (4x10-12)",
            "Dumbbell Shoulder Press (4x8-10)",
            "Dumbbell Lateral Raises (4x10-12)",
            "Tricep Dips (4x8-10)",
            "Tricep Kickbacks (4x10-12)",
            "Russian Twists (4x15-20)"
          ],
          day2: [ // Pull
            "Pull-ups (4x6-8)",
            "Bent Over Dumbbell Rows (4x8-10 per arm)",
            "Bicep Curls with Dumbbells (4x10-12)",
            "Reverse Flyes with Dumbbells (4x10-12)",
            "Hammer Curls with Dumbbells (4x10-12)",
            "Plank (4x30 seconds to 1 minute)"
          ],
          day3: [ // Legs
            "Bodyweight Squats (4x12-15)",
            "Lunges (4x10-12 per leg)",
            "Glute Bridges (4x12-15)",
            "Calf Raises (4x15-20)",
            "Mountain Climbers (4x20-30 seconds)",
            "Hanging Leg Raises (4x10-15)"
          ],
          day4: [ // Push
            "Chair Dips (4x10-12)",
            "Arnold Press (4x8-10)",
            "Front Dumbbell Raises (4x10-12)",
            "Push-up Variations (4x8-12)",
            "Close Grip Push-ups (4x10-12)",
            "Russian Twists (4x15-20)"
          ],
          day5: [ // Pull
            "Resistance Band Rows (4x10-12)",
            "Chin-ups (4x6-8)",
            "Resistance Band Bicep Curls (4x10-12)",
            "Face Pulls with Resistance Band (4x10-12)",
            "Reverse Grip Bicep Curls (4x10-12)",
            "Plank (4x30 seconds to 1 minute)"
          ],
          day6: [ // Legs
            "Jump Squats (4x10-12)",
            "Single-Leg Romanian Deadlifts with Dumbbells (4x10-12 per leg)",
            "Step-ups (4x10-12 per leg)",
            "Calf Raises with Dumbbells (4x15-20)",
            "Russian Twists with Medicine Ball (4x15-20)",
            "Hollow Body Hold (4x20-30 seconds)"
          ]
        },
        advanced: {
          day1: [ // Push
            "Weighted Push-ups (5x8-10)",
            "Barbell Shoulder Press (5x5-8)",
            "Lateral Raises with Dumbbells (5x8-10)",
            "Weighted Dips (5x5-8)",
            "Overhead Tricep Extension with Dumbbell (5x8-10)",
            "Russian Twists with Medicine Ball (5x15-20)"
          ],
          day2: [ // Pull
            "Weighted Pull-ups (5x5-8)",
            "Barbell Rows (5x5-8)",
            "Preacher Curls with EZ Bar (5x8-10)",
            "Face Pulls with Cable (5x10-12)",
            "Concentration Curls with Dumbbell (5x8-10)",
            "Plank (5x30 seconds to 1 minute)"
          ],
          day3: [ // Legs
            "Barbell Squats (5x5)",
            "Deadlifts (5x5)",
            "Walking Lunges with Dumbbells (5x8-10 per leg)",
            "Standing Calf Raises with Barbell (5x10-12)",
            "Leg Raises (5x10-15)",
            "Hanging Leg Raises (5x10-15)"
          ],
          day4: [ // Push
            "Weighted Push-ups (5x8-10)",
            "Barbell Shoulder Press (5x5-8)",
            "Lateral Raises with Dumbbells (5x8-10)",
            "Weighted Dips (5x5-8)",
            "Overhead Tricep Extension with Dumbbell (5x8-10)",
            "Russian Twists with Medicine Ball (5x15-20)"
          ],
          day5: [ // Pull
            "Weighted Pull-ups (5x5-8)",
            "Barbell Rows (5x5-8)",
            "Preacher Curls with EZ Bar (5x8-10)",
            "Face Pulls with Cable (5x10-12)",
            "Concentration Curls with Dumbbell (5x8-10)",
            "Plank (5x30 seconds to 1 minute)"
          ],
          day6: [ // Legs
            "Barbell Squats (5x5)",
            "Deadlifts (5x5)",
            "Walking Lunges with Dumbbells (5x8-10 per leg)",
            "Standing Calf Raises with Barbell (5x10-12)",
            "Leg Raises (5x10-15)",
            "Hanging Leg Raises (5x10-15)"
          ]
        }
      },

      Gym: {
        beginner: {
          day1: [ // Push
            "Barbell Bench Press (3x10-12)",
            "Dumbbell Shoulder Press (3x10-12)",
            "Tricep Pushdowns (3x10-12)",
            "Chest Flyes (3x10-12)",
            "Lateral Raises (3x10-12)"
          ],
          day2: [ // Pull
            "Lat Pulldowns (3x10-12)",
            "Seated Cable Rows (3x10-12)",
            "Bicep Curls (3x10-12)",
            "Face Pulls (3x10-12)",
            "Hammer Curls (3x10-12)"
          ],
          day3: [ // Legs
            "Barbell Squats (3x10-12)",
            "Romanian Deadlifts (3x10-12)",
            "Leg Press (3x10-12)",
            "Leg Curls (3x10-12)",
            "Calf Raises (3x15-20)"
          ],
          day4: [ // Push
            "Dumbbell Bench Press (3x10-12)",
            "Overhead Press (3x10-12)",
            "Tricep Dips (3x10-12)",
            "Incline Dumbbell Flyes (3x10-12)",
            "Front Raises (3x10-12)"
          ],
          day5: [ // Pull
            "Bent Over Barbell Rows (3x10-12)",
            "Pull-ups (3x8-10)",
            "Barbell Shrugs (3x10-12)",
            "Preacher Curls (3x10-12)",
            "Reverse Flyes (3x10-12)"
          ],
          day6: [ // Legs
            "Deadlifts (3x8-10)",
            "Leg Extensions (3x10-12)",
            "Walking Lunges with Dumbbells (3x10-12 per leg)",
            "Seated Calf Raises (3x15-20)",
            "Hanging Leg Raises (3x10-12)"
          ]
        },
        intermediate: {
          day1: [ // Push
            "Barbell Bench Press (4x8-10)",
            "Dumbbell Shoulder Press (4x8-10)",
            "Tricep Pushdowns (4x8-10)",
            "Chest Flyes (4x8-10)",
            "Lateral Raises (4x8-10)"
          ],
          day2: [ // Pull
            "Lat Pulldowns (4x8-10)",
            "T-Bar Rows (4x8-10)",
            "Bicep Curls (4x8-10)",
            "Face Pulls (4x8-10)",
            "Hammer Curls (4x8-10)"
          ],
          day3: [ // Legs
            "Barbell Squats (4x8-10)",
            "Romanian Deadlifts (4x8-10)",
            "Leg Press (4x8-10)",
            "Leg Curls (4x8-10)",
            "Calf Raises (4x12-15)"
          ],
          day4: [ // Push
            "Dumbbell Bench Press (4x8-10)",
            "Overhead Press (4x8-10)",
            "Tricep Dips (4x8-10)",
            "Incline Dumbbell Flyes (4x8-10)",
            "Front Raises (4x8-10)"
          ],
          day5: [ // Pull
            "Bent Over Barbell Rows (4x8-10)",
            "Pull-ups (4x6-8)",
            "Barbell Shrugs (4x8-10)",
            "Preacher Curls (4x8-10)",
            "Reverse Flyes (4x8-10)"
          ],
          day6: [ // Legs
            "Deadlifts (4x6-8)",
            "Leg Extensions (4x8-10)",
            "Walking Lunges with Dumbbells (4x8-10 per leg)",
            "Seated Calf Raises (4x12-15)",
            "Hanging Leg Raises (4x10-12)"
          ]
        },
        advanced: {
          day1: [ // Push
            "Barbell Bench Press (5x5)",
            "Dumbbell Shoulder Press (5x5)",
            "Tricep Pushdowns (5x8-10)",
            "Chest Flyes (5x8-10)",
            "Lateral Raises (5x8-10)"
          ],
          day2: [ // Pull
            "Weighted Pull-ups (5x5)",
            "Barbell Rows (5x5)",
            "Bicep Curls (5x8-10)",
            "Face Pulls (5x8-10)",
            "Hammer Curls (5x8-10)"
          ],
          day3: [ // Legs
            "Barbell Squats (5x5)",
            "Romanian Deadlifts (5x5)",
            "Leg Press (5x5)",
            "Leg Curls (5x8-10)",
            "Calf Raises (5x12-15)"
          ],
          day4: [ // Push
            "Dumbbell Bench Press (5x5)",
            "Overhead Press (5x5)",
            "Tricep Dips (5x8-10)",
            "Incline Dumbbell Flyes (5x8-10)",
            "Front Raises (5x8-10)"
          ],
          day5: [ // Pull
            "Bent Over Barbell Rows (5x5)",
            "Pull-ups (5x5)",
            "Barbell Shrugs (5x5)",
            "Preacher Curls (5x8-10)",
            "Reverse Flyes (5x8-10)"
          ],
          day6: [ // Legs
            "Deadlifts (5x5)",
            "Leg Extensions (5x8-10)",
            "Walking Lunges with Dumbbells (5x8-10 per leg)",
            "Seated Calf Raises (5x12-15)",
            "Hanging Leg Raises (5x10-12)"
          ]
        }
      }
    };

    // Logic to choose the workout plan based on the split,location and difficulty
    switch (split) {
      case 'fullBody':
        selectedWorkoutPlan = fullBody[location][difficulty];
        break;
      case 'broSplit':
        selectedWorkoutPlan = broSplit[location][difficulty];
        break;
      case 'ppl':
        selectedWorkoutPlan = ppl[location][difficulty];
        break;
      default:
        break;
    }

    // Objects for Location and Difficulty options to choose from based on the value sent from radio buttons
    const locationOptions = {
      Home: 'Home workout plan',
      Gym: 'Gym workout plan'
    };
    const difficultyOptions = {
      beginner: '( Difficulty : Beginner )',
      intermediate: '( Difficulty : Intermediate )',
      advanced: '( Difficulty : Advanced )'
    };

    // Loop to add how many days are to be showed based on split length
    for (let i = 0; i < splitLength; i++) {
      daysDisplayed[i] = days[i];
    }

    // Your logic to update displayLocation, displayDifficulty, and displayWorkout
    setDisplayLocation(locationOptions[location]);
    setDisplayDifficulty(difficultyOptions[difficulty]);
    setDisplayWorkout(selectedWorkoutPlan);
    setDisplayDay(daysDisplayed);

    console.log(displayWorkout);
  };


  return (
    <>
      <div className='min-w-md min-h-screen bg-[rgb(34,40,49)]'>
        <h1 className='text-3xl text-center bg-[rgb(12,12,12)] py-6 text-[rgb(222,208,182)]' >Workout Generator</h1>
        <div className='grid grid-cols-2 my-4 bg-[rgb(20,20,20)] mx-5 rounded-lg outline-5 outline-[rgb(238,238,238)]'>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col mx-2 py-4'>
              <h1 className='text-2xl py-3 px-3 bg-[rgb(178,165,155)]/50 rounded-lg'>Choose your preferences : </h1>
              <div className='flex text-lg flex-row py-3 mx-3 mt-3 text-[rgb(238,238,238)]'>
                <h4 className='mx-3'>Location :</h4>
                <label className='cursor-pointer'>
                  <input
                    type="radio"
                    name='Location'
                    value='Home'
                    className='mx-3'
                    checked={location === 'Home'}
                    onChange={() => setLocation('Home')}
                  />Home</label>
                <label className='cursor-pointer'>
                  <input
                    type="radio"
                    name='Location'
                    className='mx-3'
                    value='Gym'
                    checked={location === 'Gym'}
                    onChange={() => setLocation('Gym')}
                  />Gym</label>
              </div>
              <div className='flex flex-col py-3 px-3 text-[rgb(238,238,238)] text-lg my-1'>
                <h4 className='text-lg mx-3 mb-1'>Difficulty : </h4>
                <label className='cursor-pointer'>
                  <input
                    type="radio"
                    name='difficulty'
                    className='mx-3'
                    value='beginner'
                    onChange={() => setDifficulty('beginner')}
                  />
                  Beginner</label>
                <label className='cursor-pointer'>
                  <input
                    type="radio"
                    name='difficulty'
                    className='mx-3'
                    value='intermediate'
                    onChange={() => setDifficulty('intermediate')}
                  />
                  Intermediate</label>
                <label className='cursor-pointer'>
                  <input
                    type="radio"
                    name='difficulty'
                    className='mx-3'
                    value='advanced'
                    onChange={() => setDifficulty('advanced')}
                  />
                  Advanced</label>
              </div>
              <div className='flex flex-col py-3 px-3 text-lg text-[rgb(238,238,238)]'>
                <h4 className=' mx-3 mb-1 mt-2'>Split : </h4>
                <label className='cursor-pointer'>
                  <input
                    type="radio"
                    name='split'
                    className='mx-3'
                    value="fullBody"
                    onChange={() => handleSplitChange('fullBody', 3)}
                  />
                  Full Body (3 days a week)</label>
                <label className='cursor-pointer'>
                  <input
                    type="radio"
                    name='split'
                    className='mx-3'
                    value="broSplit"
                    onChange={() => handleSplitChange('broSplit', 5)}
                  />
                  Bro Split (5 days a week)</label>
                <label className='cursor-pointer'>
                  <input
                    type="radio"
                    name='split'
                    className='mx-3'
                    value="ppl"
                    onChange={() => handleSplitChange('ppl', 6)}
                  />
                  PPL (6 days a week)</label>
              </div>
              <div>
                <input
                  type="submit"
                  value="Generate Workout"
                  className='my-5 mx-2 bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full cursor-pointer'
                />
              </div>
            </div>
          </form>


          <div className='flex flex-col py-4 bg-[rgb(27,27,27)]/100 text-[rgb(238,238,238)] rounded-lg'>
            <h1 className='text-2xl py-3 px-3 mx-3 rounded-lg bg-[rgb(178,165,155)]/50 text-black'>Workout Routine : </h1>
          
            <p className='mx-3 mb-4 mt-6 text-xl'><b>{displayLocation}</b> &nbsp; &nbsp;<i>{displayDifficulty}</i> </p>

            {displayWorkout && Object.keys(displayWorkout).map((dayKey, index) => (
              <div key={index}>
                <h2 className='text-md font-semibold my-3 mx-5'><u>{dayKey}</u></h2>
                <ul className='list-decimal mx-8'>
                  {displayWorkout[dayKey].map((exercise, i) => (
                    <li key={i} className='my-1'>{exercise}</li>
                  ))}
                </ul>
              </div>
            ))}



          </div>
        </div>
      </div>

    </>
  )
}

export default App
