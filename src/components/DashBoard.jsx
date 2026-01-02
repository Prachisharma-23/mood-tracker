
<div className="page">
  <header className="header">
    <div>
      <h1>Mood Tracker</h1>
      <p>Welcome back, {user.username}</p>
    </div>
    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  </header>

  <main className="content">
    <section className="card">
      <h2>Add Mood</h2>
      <MoodForm onMoodAdded={fetchMoods} />
    </section>

    <section className="card">
      <h2>Recent Moods</h2>
      <MoodList moods={moods} />
    </section>

    <section className="card">
      <h2>Mood Trends</h2>
      <MoodChart data={moods} />
    </section>
  </main>
</div>
