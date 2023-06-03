<script>
  export let summary;
  export let description;
  export let start;
  export let end;

  let friendlyStartDateString = new Date(start.dateTime).toLocaleTimeString(
    "en-US",
    { timeStyle: "short" }
  );

  let friendlyEndDateString = new Date(end.dateTime).toLocaleTimeString(
    "en-US",
    { timeStyle: "short" }
  );
</script>

<div class="event">
  <div class="event-details">
    <h3 class="event-summary">{summary}</h3>
    <span class="event-time"
      >{friendlyStartDateString} - {friendlyEndDateString}</span
    >
  </div>
  <p class="event-description">{description}</p>
</div>

<style>
  .event {
    margin: 50px 0;
  }
  .event-summary {
    margin: 0;
  }
  .event-details {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .event-time {
    margin-left: auto;
  }
</style>
