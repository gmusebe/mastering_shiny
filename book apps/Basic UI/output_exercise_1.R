library(shiny)

ui <- fluidPage(
  verbatimTextOutput("summary"),
  textOutput("greet"),
  verbatimTextOutput("results"),
  textOutput("test")
)

server <- function(input, output, session) {
  output$summary <- renderPrint(summary(mtcars))
  output$greet <- renderText("Good morning!")
  output$results <- renderPrint(t.test(1:5, 2:6))
  output$test <- renderText(str(lm(mpg ~ wt, data = mtcars)))
}

shinyApp(ui, server)