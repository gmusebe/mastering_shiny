#--libraries--
library(shiny)

animals <- c("dog", "cat", "mouse", "bird", "other", "I hate animals")

ui <- fluidPage(
  # inputs:---
  # Free texts:---
  textInput("name", "What's your name?"),
  passwordInput("password", "What's your password?"),
  textAreaInput("story", "Tell me about yourself", rows =3),
  
  # Numeric inputs:---
  numericInput("num", "Number one", value = 0, min = 0, max = 100),
  sliderInput(
    inputId = "min",
    label = "Limit (minimum)",
    value = 50,
    min = 0,
    max = 100
  ),
  sliderInput("rng", "Range", value = c(10, 20), min = 0, max = 100),
  
  # Dates:---
  # Single day input
  dateInput("dob", "When were you born?"),
  # Range
  dateRangeInput("holiday", "When do you want to go on vacation next"),
  
  # Limited Choices: Prespecified for options:
  selectInput("state", "What's your favourite state?", choices = state.name),
  radioButtons("animal", "What's your favourite animal?", choices =  animals),
  
  # button icons:---
  radioButtons("rb", "Choose one:",
               choiceNames = list(
                 icon("angry"),
                 icon("smile"),
                 icon("sad-tear")
               ),
               choiceValues = list("angry", "happy", "sad")
  ),
  # multiple select input:---
  selectInput(
    "state", "What's your favourite state?", state.name,
    multiple = TRUE
    ),
  
  # select multiple values with check boxes:---
  checkboxGroupInput("animal", "what animals do you like?", animals),
  
  # single yes/no check box:---
  checkboxInput("cleanup", "clean up", value = TRUE),
  checkboxInput("shutdown", "Shutdown"),
  
  # File Uploads:--
  fileInput("upload", NULL),
  
  # Action buttons:---
  fluidRow(
    actionButton("click", "Click me !",
                 class = "btn-danger"), # customize appearance
    actionButton("drink", "Drink me!", icon = icon("cocktail"),
                 class = "btn-lg btn-success") # change size
  ),
  fluidRow(
    # span
    actionButton("eat", "Eat me!", class = "btn-block")
  ),
  
  # outputs:---
  # Text
  textOutput("text"), # accessed by output$text
  verbatimTextOutput("code"), # accessed by output$code
  
  # tables:--
  tableOutput("static"),
  dataTableOutput("dynamic")
)

server <- function(input, output, session) {
  output$text <- renderText({
    "Hello friend"
  })
  output$code <- renderPrint({
    summary(1:10)
  })
  output$static <- renderTable(
    head(mtcars)
  )
  output$dynamic <- renderDataTable(mtcars, options = list(pageLength = 5))
}

shinyApp(ui, server)
