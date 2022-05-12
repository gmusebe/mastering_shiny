#--libraries--
library(shiny)

animals <- c("dog", "cat", "mouse", "bird", "other", "I hate animals")

ui <- fluidPage(
  # Free texts
  textInput("name", "What's your name?"),
  passwordInput("password", "What's your password?"),
  textAreaInput("story", "Tell me about yourself", rows =3),
  
  # Numeric inputs
  numericInput("num", "Number one", value = 0, min = 0, max = 100),
  sliderInput(
    inputId = "min",
    label = "Limit (minimum)",
    value = 50,
    min = 0,
    max = 100
  ),
  sliderInput("rng", "Range", value = c(10, 20), min = 0, max = 100),
  
  # Dates
  # Single day input
  dateInput("dob", "When were you born?"),
  # Range
  dateRangeInput("holiday", "When do you want to go on vacation next"),
  
  # Limited Choices: Prespecified for options:
  selectInput("state", "What's your favourite state?", choices = state.name),
  radioButtons("animal", "What's your favourite animal?", choices =  animals),
  
  # button icons:
  radioButtons("rb", "Choose one:",
               choiceNames = list(
                 icon("angry"),
                 icon("smile"),
                 icon("sad-tear")
               ),
               choiceValues = list("angry", "happy", "sad")
  )
)

server <- function(input, output, session) {
  
}

shinyApp(ui, server)
