# 05 Public API Plumbing

- adds new protected functions:
    - \_control() 
    - \_toggle() 
- converts enable()/disable() to call \_control()/\_control(false) respectively
- converts expand()/collapse() to call \_toggle()/\_toggle(false) respectively
- the *public* API functions are *complete* at this point
