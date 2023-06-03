<script>
  import { onMount } from "svelte";
  import { PUBLIC_API_KEY, PUBLIC_CALENDAR_ID } from "$env/static/public";

  import Event from "../../lib/components/Event.svelte";

  let events = [];

  let availableDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let selectedDay = availableDays[new Date(Date.now()).getDay()];

  $: console.log(events);

  $: todaysEvents = events.filter((calEvent) => {
    const eventDay = new Date(calEvent.start.dateTime).getDay();

    return availableDays[eventDay] === selectedDay;
  });

  const setSelectedDay = (event) => {
    selectedDay = event.target.innerText;
  };

  onMount(async () => {
    const result = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${PUBLIC_CALENDAR_ID}/events?key=${PUBLIC_API_KEY}`,
      {
        method: "GET",
        mode: "cors",
      }
    );
    const jsonResult = await result.json();

    events = jsonResult.items;
  });
</script>

<div class="calendar">
  <ul class="days-list">
    {#each availableDays as day}
      <li class="day-selector" class:selected={day === selectedDay}>
        <button type="button" on:click={setSelectedDay}>
          {day}
        </button>
      </li>
    {/each}
  </ul>
  <div class="events">
    {#if todaysEvents?.length > 0}
      {#each todaysEvents as event}
        <Event {...event} />
      {/each}
    {:else}
      <p class="no-events">No events today!</p>
    {/if}
  </div>
</div>

<style>
  .calendar {
    font-family: "Arial";
    max-width: 600px;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .days-list {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  .day-selector button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 10px 20px;
  }

  .day-selector.selected button {
    background-color: #2a7c6f;
    color: white;
  }

  .no-events {
    display: block;
    text-align: center;
    padding: 30px 0;
    font-size: 20px;
  }
</style>
