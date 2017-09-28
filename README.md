To get started:

```
$ npm install
$ npm start
$ open http://localhost:9100/
```

Tasks:

1. Implement blockClicked to recursively remove (or hide) all blocks of the same colour that are connected to the target element.
2. Redraw the grid moving empty blocks to the top of each column.
3. Ensure blockClicked still correctly calculates neighbours after removing blocks.

Similar to Tetris but you have to click a block to have matching blocks removed.

E.g.,

Given:

```
#######
###$$##
###$##$
##$$###
```

After the first $ is clicked the board would look like this:

```
##   ##
### ###
### ##$
#######
```

Then clicking any of the # will result in:

```



     $
```
