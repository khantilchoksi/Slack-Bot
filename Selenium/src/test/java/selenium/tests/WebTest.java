package selenium.tests;

import static org.junit.Assert.*;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.github.bonigarcia.wdm.ChromeDriverManager;

public class WebTest
{
	private static WebDriver driver;
	
	@BeforeClass
	public static void setUp() throws Exception 
	{
		//driver = new HtmlUnitDriver();
		ChromeDriverManager.getInstance().setup();
		driver = new ChromeDriver();
	}
	
	@AfterClass
	public static void  tearDown() throws Exception
	{
		driver.close();
		driver.quit();
	}

	
//	@Test
//	public void googleExists() throws Exception
//	{
//		driver.get("http://www.google.com");
//        assertEquals("Google", driver.getTitle());		
//	}
	

//	@Test
//	public void Closed() throws Exception
//	{
//		driver.get("http://www.checkbox.io/studies.html");
//		
//		// http://geekswithblogs.net/Aligned/archive/2014/10/16/selenium-and-timing-issues.aspx
//		WebDriverWait wait = new WebDriverWait(driver, 30);
//		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@class='status']/span[.='CLOSED']")));
//		List<WebElement> spans = driver.findElements(By.xpath("//a[@class='status']/span[.='CLOSED']"));
//
//		assertNotNull(spans);
//		assertEquals(5, spans.size());
//	}

	@Test
	public void postMessage()
	{
		driver.get("https://se-projectworkspace.slack.com");
		
		// Wait until page loads and we can see a sign in button.
		WebDriverWait wait = new WebDriverWait(driver, 30);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("signin_btn")));

		// Find email and password fields.
		WebElement email = driver.findElement(By.id("email"));
		WebElement pw = driver.findElement(By.id("password"));

		// Type in our test user login info.
		String passw = "abcde@0099";
		email.sendKeys("asoni3@ncsu.edu");
		pw.sendKeys(passw);

		// Click
		WebElement signin = driver.findElement(By.id("signin_btn"));
		signin.click();

		// Wait until we go to general channel.
		wait.until(ExpectedConditions.titleContains("general"));

		// Switch to #bots channel and wait for it to load.
		driver.get("https://se-projectworkspace.slack.com/messages/selenium_testing");
		wait.until(ExpectedConditions.titleContains("selenium_testing"));

		// Type something
		WebElement messageBot = driver.findElement(By.id("msg_input"));
		assertNotNull(messageBot);
		
		Actions actions = new Actions(driver);
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("@taskbot template");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();

		wait.withTimeout(10	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//input[@class='lfs_input']")));

		String msg = driver.findElement(
		By.xpath("//input[@class='lfs_input']")).getAttribute("placeholder");
		assertNotNull(msg);
		assertEquals(msg, "Select a template...");
		wait.withTimeout(10	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@class='lfs_input'][last()]")));
		WebElement wb = driver.findElement(By.xpath("//input[@class='lfs_input'][last()]"));
		wait.until(ExpectedConditions.elementToBeClickable(wb));
		System.out.println(wb.getAttribute("placeholder"));
		JavascriptExecutor js = (JavascriptExecutor)driver;
		js.executeScript("arguments[0].click()", wb);
//		actions.moveToElement(wb);
//		actions.click();
//		actions.build().perform();
//		actions.sendKeys("Scrum Board");
//		actions.sendKeys(Keys.ARROW_DOWN);
//		actions.sendKeys(Keys.RETURN);
//		actions.build().perform();
		System.out.println(" WB Clicked");
		wait.withTimeout(5	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		actions.moveToElement(messageBot);
		actions.click();
		actions.build().perform();
		
		System.out.println(" Clicked outside");
		wait.withTimeout(5	, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		//wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class='lfs_item'][last()]")));

		//WebElement wb2 = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//div[@class='lfs_item'][last()]")));
		WebElement wb2 = driver.findElement(By.xpath("//div[@class='lfs_item single'][last()]"));
		JavascriptExecutor js2 = (JavascriptExecutor)driver;
		js2.executeScript("arguments[0].click()", wb2);
//		actions.moveToElement(wb2);
//		wait.until(ExpectedConditions.elementToBeClickable(wb2));
//		actions.click();
//		actions.build().perform();
		System.out.println(" WB2 Clicked");


		//		try {
//			Thread.sleep(50000);
//		} catch (InterruptedException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
	}
}
