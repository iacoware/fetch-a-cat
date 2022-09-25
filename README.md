# Fetch-a-Cat

### Run the app

```
npm install
```

```
npm start
```

## Notes - Socrates 2022

### Resilient UI with state machines (statecharts)


- If you want to build the app with me, clone the repo:

`git clone https://github.com/iacoware/fetch-a-cat`

`git checkout 50410d3 -b socrates`

### The Plan
- Show a very simple app using just useState
- Challenges of a modern app
- Back to our example, where the complexity is coming from?
- Rebuild the app with a state machine, specifically xstate
- Recap



### Review `useState` app
- Let’s see what it does


- Challenges of a modern UI
    - Async interaction (in between states like “loading”)
    - User notifications (action results or visual cues)
    - Error handling
    - Server updates (real-time updates)
    - Sharing bits of data between components
    - Navigation (again async)


- Solving these challenges enable a UX that is consistent, reliable, deterministic. Think about the bazillion apps that you use on a daily basis and I’m sure you have some complain about the UX and how they should do a better job for their users!


- How is it implemented? Do we have some complexity? Where does it comes from?
    - Infer states from data

    - Even if you don’t reason in terms of states they are still there. They are just implicit:
        - You’re taking decision based on the data/values you have at the moment, in terms of what the UI should show and if a behaviour (eg: user interaction) is allowed

        - Examples
            - `cats.length === 0 && !isLoading && !isError`
            - `unreadMessages.length > 0 && <h1>You have {unreadMessages.length} messages</h1>`

        - The number of states of an application is more stable than the data we’re using to infer the states


- Can we do better?
    - I think so, let’s make application's states first-class citizens


### Redo Fetch-a-Cat with XState

- FSM hello world (traffic light)
    - code and then visualizer [https://stately.ai/viz](https://stately.ai/viz)


- Fetch-a-Cat (XState edition)
    - add “fetch” button to fetch cats
    - show message when loading
    - show message if we haven’t fetched anything yet
    - prevent multiple fetch when we're loading
    - disable Fetch button if we’re already fetching
    - handle fetching errors
    - clear previous cats on error
    - click a cat show it bigger


### Recap

- Pros:
      - Makes app states explicit (Visible→Easier to reason about→Less bug)
      - No unrepresentable state
      - Building a FSM forces you to explore all states (lower chance of gap in the model)
      - Behaviour decoupled from UI
      - Resilient/Deterministic


- Cons:
    - Different paradigm. It takes some time to get used to. The modelling part it’s a good approach anyway, it makes exploring all possible state more likely

      
- Things we haven't touched
  - FSM vs Statecharts [https://statecharts.dev](https://statecharts.dev/)
  - Tests
  - XState Actors


### Resources
- [https://xstate.js.org/docs](https://xstate.js.org/docs)
- [https://statecharts.dev/](https://statecharts.dev/)
- [https://github.com/darrylhebbes/awesome_xstate](https://github.com/darrylhebbes/awesome_xstate)
