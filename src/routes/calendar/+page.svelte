<script>
  import { onMount } from "svelte";
  import { PUBLIC_API_KEY, PUBLIC_CALENDAR_ID } from "$env/static/public";

  import Event from "../../lib/components/Event.svelte";

  let events = [];

  let availableDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let selectedDay = availableDays[new Date(Date.now()).getDay()];

  let today = new Date();
  let dDay = today.getDay() > 0 ? today.getDay() : 7;
  let first = today.getDate() - dDay + 1;
  let startOfWeek = new Date(today.setDate(first));
  let endOfWeek = new Date(today.setDate(startOfWeek.getDate() + 6));

  $: todaysEvents = events
    .filter((calEvent) => {
      if (calEvent.status === "cancelled") {
        return false;
      }

      const eventDay = new Date(calEvent.start.dateTime).getDay();

      return availableDays[eventDay] === selectedDay;
    })
    .sort((a, b) => new Date(a.start.dateTime) > new Date(b.start.dateTime));

  const setSelectedDay = (event) => {
    selectedDay = event.target.innerText;
  };

  onMount(async () => {
    const result = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${PUBLIC_CALENDAR_ID}/events?timeMin=${startOfWeek.toISOString()}&timeMax=${endOfWeek.toISOString()}&singleEvents=true&key=${PUBLIC_API_KEY}`,
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
    padding: 0px 40px 10px 40px;
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
    padding-bottom: 20px;
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
