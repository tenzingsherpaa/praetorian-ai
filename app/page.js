"use client";

import { useEffect, useMemo, useState } from "react";

const COURSES = ["All", "COS 240", "COS 435", "CLA", "IW"];
const VIEWS = ["timeline", "week", "calendar"];
const STORAGE_KEY = "spring-2026-dashboard-state";
const NOW = new Date("2026-03-16T09:00:00-04:00");

const deadlines = [
  {
    id: "iw-talk-workshop",
    title: "How to Give an IW Talk",
    course: "IW",
    type: "Workshop",
    date: "2026-03-17T12:30:00",
    endDate: "2026-03-17T13:30:00",
    location: "CS 104",
    weight: null,
    importance: "medium",
    notes: "Review presentation expectations and bring notes/questions.",
    prep: ["Outline your eventual talk", "List questions for the workshop"],
  },
  {
    id: "cla-coin-1",
    title: "Coin Field Trip 1",
    course: "CLA",
    type: "In-class activity",
    date: "2026-03-19T10:00:00",
    endDate: "2026-03-19T11:00:00",
    topic: "War/Peace",
    importance: "medium",
    notes: "Bring materials.",
  },
  {
    id: "cos435-proposal",
    title: "RL Project Proposal",
    course: "COS 435",
    type: "Major deliverable",
    date: "2026-03-20T23:59:00",
    endDate: "2026-03-21T00:15:00",
    weight: "12%",
    importance: "high",
    notes: "1-page PDF on Ed, prepared in LaTeX.",
    prep: ["Finalize topic", "Define problem statement", "Clarify approach", "Export final PDF"],
  },
  {
    id: "cos240-ps3",
    title: "PS3 Due",
    course: "COS 240",
    type: "Problem set",
    date: "2026-03-24T17:00:00",
    endDate: "2026-03-24T17:30:00",
    importance: "high",
    notes: "Week 8 problem set.",
  },
  {
    id: "iw-paper-workshop",
    title: "How to Write an IW Paper",
    course: "IW",
    type: "Workshop",
    date: "2026-03-24T12:30:00",
    endDate: "2026-03-24T13:30:00",
    location: "CS 104",
    importance: "medium",
    notes: "Writing workshop for the paper milestone.",
  },
  {
    id: "iw-talk-roadmap",
    title: "IW Talk",
    course: "IW",
    type: "Milestone",
    date: "2026-03-24T15:00:00",
    endDate: "2026-03-24T15:30:00",
    importance: "high",
    notes: "Appears on the weekly roadmap as IW Talk (3/24).",
  },
  {
    id: "cla-coin-2",
    title: "Coin Field Trip 2",
    course: "CLA",
    type: "In-class activity",
    date: "2026-03-26T10:00:00",
    endDate: "2026-03-26T11:00:00",
    topic: "Administering Empire",
    importance: "medium",
    notes: "Room TBD.",
  },
  {
    id: "cos435-peer-feedback",
    title: "Peer Feedback",
    course: "COS 435",
    type: "Deliverable",
    date: "2026-03-27T23:59:00",
    endDate: "2026-03-28T00:15:00",
    weight: "2%",
    importance: "medium",
    notes: "1 paragraph on another group's post.",
  },
  {
    id: "cla-response-2",
    title: "Response #2",
    course: "CLA",
    type: "Written response",
    date: "2026-03-27T17:00:00",
    endDate: "2026-03-27T17:30:00",
    weight: "10%",
    importance: "high",
    notes: "3-page response. Expect or schedule a 1:1 meeting invite.",
  },
  {
    id: "cos435-meeting",
    title: "1:1 Meeting",
    course: "COS 435",
    type: "Meeting",
    date: "2026-03-31T23:59:00",
    endDate: "2026-04-01T00:15:00",
    weight: "3%",
    importance: "medium",
    notes: "10-minute office-hours chat.",
  },
  {
    id: "cos240-ps4",
    title: "PS4 Due",
    course: "COS 240",
    type: "Problem set",
    date: "2026-04-07T17:00:00",
    endDate: "2026-04-07T17:30:00",
    importance: "high",
  },
  {
    id: "cos240-quiz2",
    title: "Quiz 2",
    course: "COS 240",
    type: "Quiz",
    date: "2026-04-08T10:00:00",
    endDate: "2026-04-08T11:00:00",
    importance: "high",
  },
  {
    id: "cla-outline",
    title: "Paper Outline Due",
    course: "CLA",
    type: "Writing checkpoint",
    date: "2026-04-10T17:00:00",
    endDate: "2026-04-10T17:30:00",
    weight: "5%",
    importance: "high",
    notes: "Detailed outline plus bibliography with at least 5 sources.",
  },
  {
    id: "iw-presentation-materials",
    title: "Oral Presentation Slides and Video",
    course: "IW",
    type: "Major milestone",
    date: "2026-04-12T23:59:00",
    endDate: "2026-04-13T00:15:00",
    importance: "high",
    notes: "Submit in the portal.",
  },
  {
    id: "cos240-ps5",
    title: "PS5 Due",
    course: "COS 240",
    type: "Problem set",
    date: "2026-04-21T17:00:00",
    endDate: "2026-04-21T17:30:00",
    importance: "high",
  },
  {
    id: "cos435-figure",
    title: "Experimental Figure",
    course: "COS 435",
    type: "Deliverable",
    date: "2026-04-24T23:59:00",
    endDate: "2026-04-25T00:15:00",
    weight: "8%",
    importance: "high",
    notes: "High-res figure with labels, legend, and shared slide.",
  },
  {
    id: "cla-response-3",
    title: "Response #3",
    course: "CLA",
    type: "Written response",
    date: "2026-04-24T17:00:00",
    endDate: "2026-04-24T17:30:00",
    importance: "medium",
    notes: "Final 3-page secondary analysis.",
  },
  {
    id: "iw-final-report",
    title: "Written Final Report",
    course: "IW",
    type: "Final milestone",
    date: "2026-04-26T23:59:00",
    endDate: "2026-04-27T00:15:00",
    importance: "high",
    notes: "Submit in the portal.",
  },
  {
    id: "cla-checkin",
    title: "Final Check-in",
    course: "CLA",
    type: "Meeting",
    date: "2026-05-04T10:00:00",
    endDate: "2026-05-08T17:00:00",
    weight: "5%",
    importance: "medium",
    notes: "10-minute meeting during reading week. Prep Q&A.",
    isRange: true,
  },
  {
    id: "cos435-final-report",
    title: "Final Report",
    course: "COS 435",
    type: "Final submission",
    date: "2026-05-05T22:30:00",
    endDate: "2026-05-05T23:30:00",
    weight: "60%",
    importance: "critical",
    notes: "8 pages with spelling and grammar check.",
  },
  {
    id: "cos435-code",
    title: "Code Submission",
    course: "COS 435",
    type: "Required submission",
    date: "2026-05-05T22:30:00",
    endDate: "2026-05-05T23:30:00",
    weight: "Pass/Fail",
    importance: "high",
    notes: "Public GitHub link included in the report.",
  },
  {
    id: "cos240-final",
    title: "Final Exam Window",
    course: "COS 240",
    type: "Final exam",
    date: "2026-05-05T09:00:00",
    endDate: "2026-05-08T17:00:00",
    importance: "critical",
    notes: "Finals period window from May 5 to May 8.",
    isRange: true,
  },
  {
    id: "cla-final-paper",
    title: "Final Paper",
    course: "CLA",
    type: "Final paper",
    date: "2026-05-08T12:30:00",
    endDate: "2026-05-08T14:00:00",
    weight: "20%",
    importance: "critical",
    notes: "10-12 pages. Submit to LMS.",
  },
];

const weeklyRoadmap = [
  {
    label: "Week 7",
    span: "Mar 16-20",
    focus: "COS 240 lectures 13 and 14, IW talk prep, RL proposal",
  },
  {
    label: "Week 8",
    span: "Mar 23-27",
    focus: "PS3, IW writing workshop, CLA response 2, RL peer feedback",
  },
  {
    label: "Week 9",
    span: "Mar 30-Apr 3",
    focus: "RL 1:1 meeting, COS 240 lectures 17 and 18, IW outline review",
  },
  {
    label: "Week 10",
    span: "Apr 6-10",
    focus: "PS4, Quiz 2, CLA outline",
  },
  {
    label: "Week 11",
    span: "Apr 13-17",
    focus: "IW presentation materials, experiment work, CLA imperial succession",
  },
  {
    label: "Week 12",
    span: "Apr 20-24",
    focus: "PS5, RL figure, CLA response 3",
  },
  {
    label: "Reading Period",
    span: "Apr 27-May 4",
    focus: "IW final report, CLA check-in window, COS 240 review, RL presentations",
  },
  {
    label: "Finals",
    span: "May 5-8",
    focus: "RL report and code, COS 240 final, CLA final paper",
  },
];

function formatDate(dateString, withTime = true) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    ...(withTime ? { hour: "numeric", minute: "2-digit" } : {}),
  }).format(new Date(dateString));
}

function formatShortDate(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(dateString));
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function daysUntil(dateString) {
  const target = startOfDay(new Date(dateString));
  const now = startOfDay(NOW);
  return Math.round((target - now) / 86400000);
}

function urgencyLabel(item) {
  const days = daysUntil(item.date);
  if (days < 0) return "Past";
  if (days === 0) return "Today";
  if (days <= 3) return "Due soon";
  if (days <= 10) return "This cycle";
  return "Upcoming";
}

function formatIcsDate(dateString) {
  return new Date(dateString).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function createIcs(events) {
  const body = events
    .map((event) =>
      [
        "BEGIN:VEVENT",
        `UID:${event.id}@spring-dashboard`,
        `DTSTAMP:${formatIcsDate(NOW.toISOString())}`,
        `DTSTART:${formatIcsDate(event.date)}`,
        `DTEND:${formatIcsDate(event.endDate || event.date)}`,
        `SUMMARY:${event.course} - ${event.title}`,
        `DESCRIPTION:${(event.notes || "").replace(/\n/g, "\\n")}`,
        event.location ? `LOCATION:${event.location}` : null,
        "END:VEVENT",
      ]
        .filter(Boolean)
        .join("\n")
    )
    .join("\n");

  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Spring 2026 Dashboard//EN", body, "END:VCALENDAR"].join("\n");
}

function downloadCalendar(events, fileName) {
  const blob = new Blob([createIcs(events)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function googleCalendarUrl(event) {
  const details = encodeURIComponent(event.notes || "");
  const dates = `${formatIcsDate(event.date)}/${formatIcsDate(event.endDate || event.date)}`;
  const text = encodeURIComponent(`${event.course} - ${event.title}`);
  const location = encodeURIComponent(event.location || "");
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
}

function weekBucket(dateString) {
  const date = new Date(dateString);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);
  return monday.toISOString().slice(0, 10);
}

function monthMatrix(anchorDate, items) {
  const year = anchorDate.getFullYear();
  const month = anchorDate.getMonth();
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(first.getDate() - ((first.getDay() + 6) % 7));

  return Array.from({ length: 35 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const key = date.toISOString().slice(0, 10);
    return {
      key,
      date,
      items: items.filter((item) => item.date.slice(0, 10) === key),
      isCurrentMonth: date.getMonth() === month,
      isToday: key === NOW.toISOString().slice(0, 10),
    };
  });
}

export default function Home() {
  const [activeCourse, setActiveCourse] = useState("All");
  const [showCompleted, setShowCompleted] = useState(true);
  const [view, setView] = useState("timeline");
  const [selectedDay, setSelectedDay] = useState("2026-03-16");
  const [selectedMonth, setSelectedMonth] = useState(new Date("2026-03-01T00:00:00"));
  const [done, setDone] = useState({});

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setDone(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
  }, [done]);

  const enriched = useMemo(
    () =>
      deadlines.map((item) => ({
        ...item,
        isDone: Boolean(done[item.id]),
        urgency: urgencyLabel(item),
        daysAway: daysUntil(item.date),
      })),
    [done]
  );

  const filtered = useMemo(
    () =>
      enriched.filter((item) => {
        if (activeCourse !== "All" && item.course !== activeCourse) return false;
        if (!showCompleted && item.isDone) return false;
        return true;
      }),
    [activeCourse, enriched, showCompleted]
  );

  const nextUp = filtered
    .filter((item) => !item.isDone && item.daysAway >= 0)
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  const weekGroups = filtered.reduce((acc, item) => {
    const key = weekBucket(item.date);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const selectedItems = filtered.filter((item) => item.date.slice(0, 10) === selectedDay);
  const monthCells = monthMatrix(selectedMonth, filtered);
  const completedCount = Object.values(done).filter(Boolean).length;
  const incompleteHighStake = enriched.filter(
    (item) => !item.isDone && (item.importance === "critical" || item.importance === "high")
  ).length;

  function toggleDone(id) {
    setDone((current) => ({ ...current, [id]: !current[id] }));
  }

  function exportVisibleCalendar() {
    const upcoming = filtered.filter((item) => !item.isDone && item.daysAway >= 0);
    downloadCalendar(upcoming, "spring-2026-deadlines.ics");
  }

  function markWeekComplete() {
    const weekItems = filtered.filter((item) => item.date.slice(0, 10) >= selectedDay && item.date.slice(0, 10) <= selectedDay);
    const nextState = { ...done };
    weekItems.forEach((item) => {
      nextState[item.id] = true;
    });
    setDone(nextState);
  }

  return (
    <main className="dashboard-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Spring 2026 Deadline Dashboard</p>
          <h1>One dashboard for every class deadline, milestone, and calendar action.</h1>
          <p className="hero-text">
            Filter by course, mark work complete, export upcoming items to calendar, and scan the semester by
            timeline, week, or month.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={exportVisibleCalendar}>
              Export visible deadlines
            </button>
            <button className="secondary-button" onClick={() => setShowCompleted((value) => !value)}>
              {showCompleted ? "Hide completed" : "Show completed"}
            </button>
          </div>
        </div>
        <div className="hero-metrics">
          <MetricCard label="Next up" value={nextUp ? formatShortDate(nextUp.date) : "Done"} detail={nextUp?.title || "No remaining deadlines in range"} />
          <MetricCard label="Completed" value={`${completedCount}`} detail="Saved in local browser storage" />
          <MetricCard label="High-stakes left" value={`${incompleteHighStake}`} detail="High + critical items still open" />
        </div>
      </section>

      <section className="control-bar">
        <div className="segmented">
          {COURSES.map((course) => (
            <button
              key={course}
              className={course === activeCourse ? "segment active" : "segment"}
              onClick={() => setActiveCourse(course)}
            >
              {course}
            </button>
          ))}
        </div>
        <div className="segmented">
          {VIEWS.map((option) => (
            <button
              key={option}
              className={option === view ? "segment active" : "segment"}
              onClick={() => setView(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <section className="panel panel-grid">
        <div className="focus-card">
          <p className="panel-label">What matters now</p>
          <h2>{nextUp ? nextUp.title : "Everything in this list is complete"}</h2>
          <p>{nextUp ? `${nextUp.course} • ${formatDate(nextUp.date)} • ${nextUp.urgency}` : "Use the filters to inspect the full semester."}</p>
          {nextUp ? <p className="muted">{nextUp.notes}</p> : null}
          {nextUp ? (
            <div className="button-row">
              <button className="primary-button" onClick={() => toggleDone(nextUp.id)}>
                {nextUp.isDone ? "Mark incomplete" : "Mark complete"}
              </button>
              <a className="secondary-button link-button" href={googleCalendarUrl(nextUp)} target="_blank" rel="noreferrer">
                Add next item to Google Calendar
              </a>
            </div>
          ) : null}
        </div>
        <div className="roadmap-card">
          <p className="panel-label">Weekly roadmap</p>
          <div className="roadmap-list">
            {weeklyRoadmap.map((week) => (
              <div className="roadmap-item" key={week.label}>
                <strong>{week.label}</strong>
                <span>{week.span}</span>
                <p>{week.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {view === "timeline" ? (
        <section className="timeline-list">
          {filtered
            .slice()
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((item) => (
              <article className={item.isDone ? "deadline-card done" : "deadline-card"} key={item.id}>
                <div className="deadline-main">
                  <div className={`course-pill ${item.course.toLowerCase().replace(/\s+/g, "-")}`}>{item.course}</div>
                  <h3>{item.title}</h3>
                  <p className="deadline-meta">
                    {item.type} • {item.isRange ? `${formatShortDate(item.date)} - ${formatShortDate(item.endDate)}` : formatDate(item.date)}
                    {item.weight ? ` • ${item.weight}` : ""}
                  </p>
                  <p className="deadline-notes">{item.notes || "No extra notes."}</p>
                  {item.prep?.length ? (
                    <div className="prep-list">
                      {item.prep.map((task) => (
                        <span key={task}>{task}</span>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="deadline-side">
                  <div className={`urgency-tag urgency-${item.urgency.toLowerCase().replace(/\s+/g, "-")}`}>{item.urgency}</div>
                  <button className="secondary-button" onClick={() => toggleDone(item.id)}>
                    {item.isDone ? "Undo" : "Complete"}
                  </button>
                  <button className="secondary-button" onClick={() => downloadCalendar([item], `${item.id}.ics`)}>
                    Download .ics
                  </button>
                  <a className="secondary-button link-button" href={googleCalendarUrl(item)} target="_blank" rel="noreferrer">
                    Google Calendar
                  </a>
                </div>
              </article>
            ))}
        </section>
      ) : null}

      {view === "week" ? (
        <section className="week-grid">
          {Object.entries(weekGroups)
            .sort(([a], [b]) => new Date(a) - new Date(b))
            .map(([weekStart, items]) => (
              <div className="week-card" key={weekStart}>
                <div className="week-card-header">
                  <h3>Week of {formatShortDate(weekStart)}</h3>
                  <span>{items.length} items</span>
                </div>
                {items
                  .slice()
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((item) => (
                    <button
                      key={item.id}
                      className={item.isDone ? "week-item done" : "week-item"}
                      onClick={() => {
                        setSelectedDay(item.date.slice(0, 10));
                        setView("calendar");
                      }}
                    >
                      <strong>{formatShortDate(item.date)}</strong>
                      <span>{item.title}</span>
                      <em>{item.course}</em>
                    </button>
                  ))}
              </div>
            ))}
        </section>
      ) : null}

      {view === "calendar" ? (
        <section className="calendar-layout">
          <div className="panel calendar-panel">
            <div className="calendar-header">
              <button
                className="secondary-button"
                onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1))}
              >
                Prev
              </button>
              <h2>
                {selectedMonth.toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <button
                className="secondary-button"
                onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1))}
              >
                Next
              </button>
            </div>
            <div className="calendar-grid">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div className="calendar-weekday" key={day}>
                  {day}
                </div>
              ))}
              {monthCells.map((cell) => (
                <button
                  key={cell.key}
                  className={cell.key === selectedDay ? "calendar-cell active" : "calendar-cell"}
                  data-dim={!cell.isCurrentMonth}
                  onClick={() => setSelectedDay(cell.key)}
                >
                  <span>{cell.date.getDate()}</span>
                  <small>{cell.items.length ? `${cell.items.length} item${cell.items.length > 1 ? "s" : ""}` : ""}</small>
                </button>
              ))}
            </div>
          </div>
          <div className="panel day-panel">
            <div className="day-panel-header">
              <div>
                <p className="panel-label">Selected day</p>
                <h3>{formatDate(`${selectedDay}T12:00:00`, false)}</h3>
              </div>
              <button className="secondary-button" onClick={markWeekComplete}>
                Mark selected day done
              </button>
            </div>
            <div className="day-list">
              {selectedItems.length ? (
                selectedItems.map((item) => (
                  <article className={item.isDone ? "day-item done" : "day-item"} key={item.id}>
                    <div>
                      <strong>{item.title}</strong>
                      <p>
                        {item.course} • {formatDate(item.date)}
                      </p>
                    </div>
                    <button className="secondary-button" onClick={() => toggleDone(item.id)}>
                      {item.isDone ? "Undo" : "Complete"}
                    </button>
                  </article>
                ))
              ) : (
                <p className="muted">No items on this day for the current filter.</p>
              )}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

function MetricCard({ label, value, detail }) {
  return (
    <div className="metric-card">
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{detail}</span>
    </div>
  );
}
