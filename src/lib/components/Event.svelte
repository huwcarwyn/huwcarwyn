<script>
  import { PUBLIC_API_KEY } from "$env/static/public";

  export let end;
  export let start;
  export let summary;
  export let description;
  export let attachments;

  let imageUrl;

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
    <div class="event-time">
      {friendlyStartDateString} - {friendlyEndDateString}
    </div>
    <h3 class="event-summary">{summary}</h3>

    <p class="event-description">
      {description || "No description available"}
    </p>
  </div>
  {#if attachments?.length > 0}
    <img
      src={`https://www.googleapis.com/drive/v3/files/${attachments[0].fileId}?key=${PUBLIC_API_KEY}&alt=media`}
      alt=""
      class="attachment-image"
    />
  {/if}
</div>

<style>
  .event {
    padding: 20px 0;
    text-align: left;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #2a7c6f;
  }

  .event:last-child {
    border-bottom: none;
  }

  .event-summary {
    margin: 0;
  }

  .attachment-image {
    margin-left: auto;
    min-height: 100px;
    max-height: 100px;
  }

  .event-time {
    font-size: 14px;
    margin-bottom: 10px;
  }
</style>
