USE [Todo_Db]
GO
/****** Object:  Table [dbo].[Employees]    Script Date: 8/25/2021 5:03:58 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employees](
	[Id] [varchar](36) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[Email] [nvarchar](255) NULL,
	[Phone] [nvarchar](50) NULL,
	[Position] [nvarchar](100) NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Images]    Script Date: 8/25/2021 5:03:58 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Images](
	[Id] [varchar](36) NOT NULL,
	[TaskId] [varchar](36) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[Url] [nvarchar](max) NULL,
 CONSTRAINT [PK_Images] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tasks]    Script Date: 8/25/2021 5:03:58 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tasks](
	[Id] [varchar](36) NOT NULL,
	[UserId] [varchar](36) NOT NULL,
	[LayoutId] [varchar](36) NULL,
	[Name] [nvarchar](max) NULL,
	[StartTime] [datetime] NULL,
	[EndTime] [datetime] NULL,
	[Description] [nvarchar](max) NULL,
 CONSTRAINT [PK_Task] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Images]  WITH CHECK ADD  CONSTRAINT [FK_Images_Tasks] FOREIGN KEY([TaskId])
REFERENCES [dbo].[Tasks] ([Id])
GO
ALTER TABLE [dbo].[Images] CHECK CONSTRAINT [FK_Images_Tasks]
GO
ALTER TABLE [dbo].[Tasks]  WITH CHECK ADD  CONSTRAINT [FK_Tasks_Employees] FOREIGN KEY([UserId])
REFERENCES [dbo].[Employees] ([Id])
GO
ALTER TABLE [dbo].[Tasks] CHECK CONSTRAINT [FK_Tasks_Employees]
GO
