<script>
  export let summary;
  export let description;
  export let start;
  export let end;

  $: friendlyStartDateString = new Date(start.dateTime).toLocaleTimeString(
    "en-US",
    { timeStyle: "short" }
  );

  $: friendlyEndDateString = new Date(end.dateTime).toLocaleTimeString(
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
  <p class="event-description">
    {description || "No description available"}
  </p>
</div>

<style>
  .event {
    padding: 20px 0;
    text-align: left;
    border-bottom: 1px solid #2a7c6f;
  }

  .event:last-child {
    border-bottom: none;
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
