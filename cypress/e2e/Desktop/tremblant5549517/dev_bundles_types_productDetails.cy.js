/// <reference types="Cypress" />

import Bundles from "../../PageObjects/Bundles"
import Cart from "../../PageObjects/Cart"
import HomePage from "../../PageObjects/HomePage"
import Products from "../../PageObjects/Products"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

const bundles=new Bundles
const products=new Products
const cart=new Cart
const homepage = new HomePage

beforeEach(() => {
    
    cy.viewport('macbook-13')
    products.TRActivityDetailDated()

    // // cy.get('.loading-spinner').should('be.visible')
    // cy.get('.loading-spinner').should('not.be.visible')
    cy.wait(3500)   
    cy.get('.loading-spinner').should('not.be.visible')

    // if Alert is opened, then close it
    cy.get('body').then(($ele) => {
        if ($ele.find('.alerts.unread-others.opened').length > 0) {
            cy.get('.alerts-toggle').click()
        // } else {
        //     //Do Something
        }
    })     

})

// {force: true} due to the button being covered by the top panel 

describe('Add to cart', () => {

    // Cypress._.times(5, () => {

        it('C29808 Per Itinerary Required Bundles on details page', () => {
    
            // Click on fifth 'Add to Cart' button (5 Day - Junior Snowboard Package Rental)
            products.AddToCart().eq(1).click({force: true})
            // cy.wait(2000)
    
            // Bundles pop up should be visible
            cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')
    
            // Verify 'Add To Cart' is disabled prior to completing Step 5
            bundles.AddToCart().should('be.disabled')        
    
            // Verify 'Next Step' button from Step 1 is not visible
            bundles.NextStep().eq(0).should('not.be.visible')
    
            //Click on 'Rental Pick up time - 10 am' from Step 1
            bundles.BundleOption().contains('F&F Adult Lift Ticket').click()        
    
            // Verify 'Next Step' button is now visible
            bundles.NextStep().eq(0).should('be.visible')
            
            // Verify the selected option is found on Review Add-Ons
            bundles.ReviewAddOns().should('include.text', 'F&F Adult Lift Ticket')
                .should('be.visible')        
    
            // Click on 'Next Step'
            bundles.NextStep().eq(0).click()        
            
            //Add to Cart from Bundles
            bundles.AddToCart().click()
            cart.Items({timeout: 10000}).should('be.visible')
                // cy.wait(2000)        
    
            //Verify mini cart 
            //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
            cart.Items().should('include.text', 'F&F Adult Lift Ticket')
                    .should('be.visible')
                    .should('include.text', '2 Day - Junior Snowboard Package Rental')
                    .should('be.visible')                        
    
            //Click to close mini cart
            cart.MiniCart({timeout: 10000}).click()
                // cy.wait(1500) 
                    
            // Click on fifth 'Add to Cart' button (5 Day - Junior Snowboard Package Rental)
            products.AddToCart().eq(1).click({force: true})
                cy.wait(3500)

            // Verify mini cart 
            // cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
            cart.Items().eq(0, {timeout: 10000}).should('be.visible')                    
                    .should('include.text', 'F&F Adult Lift Ticket')
                    .should('be.visible')
                    .should('include.text', '2 Day - Junior Snowboard Package Rental')
                    .should('be.visible')        

            cart.Items().eq(1, {timeout: 10000}).should('be.visible')
                    .should('include.text', 'F&F Adult Lift Ticket')
                    .should('be.visible')
                    .should('include.text', '2 Day - Junior Snowboard Package Rental')
                    .should('be.visible')            
    
        })

        it('C29809 Per itinerary Optional Bundles with selection - Details Page', () => {  
    
            // Click on fifth 'Add to Cart' button (5 Day - Junior Snowboard Package Rental)
            products.AddToCart().eq(2).click({force: true})
            // cy.wait(2000)
    
            // Bundles pop up should be visible
            cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')
    
            // Verify 'Add To Cart' is disabled prior to completing Step 5
            bundles.AddToCart().should('be.disabled')        
    
            // Verify 'Next Step' button from Step 1 is not visible
            bundles.NextStep().eq(0).should('not.be.visible')
    
            //Click on 'Rental Pick up time - 10 am' from Step 1
            bundles.BundleOption().contains('Resort Lunch Voucher').click()        
    
            // Verify 'Next Step' button is now visible
            bundles.NextStep().eq(0).should('be.visible')
            
            // Verify the selected option is found on Review Add-Ons
            bundles.ReviewAddOns().should('include.text', 'Resort Lunch Voucher')
                .should('be.visible')        
    
            // Click on 'Next Step'
            bundles.NextStep().eq(0).click()   
                // cy.wait(1500)     
            
            //Add to Cart from Bundles
            bundles.AddToCart().click()
            cart.Items({timeout: 10000}).should('be.visible')
                // cy.wait(2000)        
    
            //Verify mini cart 
            //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
            cart.Items().should('include.text', 'Resort Lunch Voucher')
                    .should('be.visible')
                    .should('include.text', '3 Day - Junior Snowboard Package Rental')
                    .should('be.visible')                        
    
            //Click to close mini cart
            cart.MiniCart({timeout: 10000}).click()
                // cy.wait(1500) 

            // Click on fifth 'Add to Cart' button (5 Day - Junior Snowboard Package Rental)
            products.AddToCart().eq(2).click({force: true})
            cy.wait(3500)
            
            //Verify mini cart 
            //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
            cart.Items().eq(0)
                .should('include.text', 'Resort Lunch Voucher')
                .should('be.visible')
                .should('include.text', '3 Day - Junior Snowboard Package Rental')
                .should('be.visible')        
            cart.Items().eq(1)
                .should('include.text', '3 Day - Junior Snowboard Package Rental')
                .should('be.visible')
                .should('not.include.text', 'Resort Lunch Voucher')
        
        })
    
        it('C29830 Per itinerary Optional Bundles with no selection - Details Page', () => {

            // Click on fifth 'Add to Cart' button (5 Day - Junior Snowboard Package Rental)
            products.AddToCart().eq(2).click({force: true})
            // cy.wait(2000)
    
            // Bundles pop up should be visible
            cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')
    
            // Verify 'Add To Cart' is disabled prior to completing Step 5
            bundles.AddToCart().should('be.disabled')        
    
            // Verify 'Next Step' button from Step 1 is not visible
            bundles.NextStep().eq(0).should('not.be.visible')
    
            // click on No Thanks button 
            bundles.NoThanks().click()
    
            // Click on 'Next Step'
            bundles.NextStep().eq(0).click()        
            
            //Add to Cart from Bundles
            bundles.AddToCart().click()
            cart.Items({timeout: 10000}).should('be.visible')
                // cy.wait(2000)        
    
            //Verify mini cart 
            //cy.get('.cart-item').should('include.text', 'Junior Lift Ticket - 2 day')
            cart.Items().should('include.text', '3 Day - Junior Snowboard Package Rental')
                    .should('be.visible')              
                    
            //Click to close mini cart
            cart.MiniCart({timeout: 10000}).click()
                // cy.wait(1500)                     
    
            // Click on fifth 'Add to Cart' button (5 Day - Junior Snowboard Package Rental)
            products.AddToCart().eq(2).click({force: true})
            // cy.wait(2000)
            
            // Bundles pop up should be visible
            cy.get('.inntopia-bundles', {timeout: 60000}).should('be.visible')
            
        })    
    
    // }) //for repeat5    

}) 
