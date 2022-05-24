# --Basic Reactivity--

library(shiny)

ui <- fluidPage(
  numericInput("x1", "Input 1st integer", value = 100),
  numericInput("x2", "Input 2nd integer", value = 50),
  numericInput("x3", "Input 2nd integer", value = 50),
  numericInput("y1", "Input 2nd integer", value = 50),
  numericInput("y2", "Input 2nd integer", value = 50),
  textOutput("z")
)

server <- function(input, output, session) {
  x <- reactive(input$x1 + input$x2 + input$x3)
  y <- reactive(input$y1 + input$y2)
  output$z <- renderText(x() / y())
  
}

shinyApp(ui, server)