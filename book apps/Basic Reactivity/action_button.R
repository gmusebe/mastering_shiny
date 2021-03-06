# -- Controlling timing of evaluation --
library(shiny)
library(ggplot2)

ui <- fluidPage(
  fluidRow(
    column(3, 
           numericInput("lambda1", label = "lambda1", value = 3),
           numericInput("lambda2", label = "lambda2", value = 5),
           numericInput("n", label = "n", value = 1e4, min = 0),
           numericInput("bindwidth", label = "Bin Width", value = 0.1, step = 0.1),
           actionButton("simulate", "Simulate!")
    ),
    column(9, plotOutput("hist"))
  )
)

server <- function(input, output, session) {
  freqpoly <- function(x1, x2, bindwidth = 0.1, xlim = c(-3, 3)) {
    df <- data.frame(
      x <- c(x1, x2),
      g <- c(
        rep("x1", length(x1)),
        rep("x2", length(x2))
      )
    )
    
    ggplot(df,aes(x, colour = g)) +
      geom_freqpoly(bindwidth = bindwidth, size = 1) +
      coord_cartesian(xlim = xlim)
  }
  
  x1 <- eventReactive(input$simulate, {
    rpois(input$n, input$lambda1)
  })
  
  x2 <- eventReactive(input$simulate, {
    rpois(input$n, input$lambda2)
  })
  
  output$hist <- renderPlot({
    freqpoly(x1(), x2(), bindwidth = input$bindwidth, xlim = c(0, 40))
  }, res = 96)
}

shinyApp(ui, server)